package org.ooml.oomlc.core.env.gen.Compiling.Java;

import org.ooml.oomlc.core.env.gen.Exception.InternalStateError;
import org.ooml.oomlc.core.env.gen.Exception.MalformedSyntaxException;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceCallSignature;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceConstructor;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceIndexSignature;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceMethod;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.BodyUnit.STInterfaceProperty;
import org.ooml.oomlc.core.env.gen.Syntax.Interface.STInterfaceBody;
import org.ooml.oomlc.core.env.gen.Syntax.Namespace.STNamespace;
import org.ooml.oomlc.core.env.gen.Syntax.STAnnotation;
import org.ooml.oomlc.core.env.gen.Syntax.STCallable;
import org.ooml.oomlc.core.env.gen.Syntax.STCallableOverloads;
import org.ooml.oomlc.core.env.gen.Syntax.STCallableParameter;
import org.ooml.oomlc.core.env.gen.Syntax.STGenericParameter;
import org.ooml.oomlc.core.env.gen.Syntax.Statement.STInterfaceStatement;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STArrayType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STCallableType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STGenericType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STInlineInterfaceType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STPrimitiveType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STReferenceType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STStringLiteralType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STType;
import org.ooml.oomlc.core.env.gen.Syntax.Type.STUnionType;
import org.ooml.oomlc.core.env.gen.Utils.Position;
import org.ooml.oomlc.core.env.gen.Utils.Util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import static java.lang.String.format;
import static org.ooml.oomlc.core.env.gen.Compiling.Java.JavaClass.ClassType.ABSTRACT;
import static org.ooml.oomlc.core.env.gen.Compiling.Java.JavaClass.ClassType.ENUM;
import static org.ooml.oomlc.core.env.gen.Compiling.Java.JavaClass.ClassType.INTERFACE;
import static org.ooml.oomlc.core.env.gen.Compiling.Java.JavaClass.ClassType.REGULAR;

public class JavaCompiler {
  static final Map<STPrimitiveType.Primitive, String> PRIMITIVE_TYPES = _createPrimitiveTypesMap();

  private final STNamespace stNamespace;
  private final JavaCompiler parent; // Can be null
  private final JavaClass namespace;
  private final List<String> interfacesQueue;
  private final Map<String, JavaType> compiledTypeAliases = new HashMap<>();
  private boolean compiled = false;

  private JavaCompiler (JavaCompiler parent, JavaClass namespace, STNamespace stNamespace) {
    this.parent = parent;
    this.stNamespace = stNamespace;
    this.namespace = namespace;
    this.interfacesQueue = new ArrayList<>(stNamespace.getInterfaces().keySet());
  }

  private static JavaType createAnyType () {
    // Don't create constant as types are modified (e.g. isNullable)
    // If you don't modify, then having constant is pointless
    return new JavaType("Object");
  }

  private static JavaType createVoidType () {
    return new JavaType("void");
  }

  private static Map<STPrimitiveType.Primitive, String> _createPrimitiveTypesMap () {
    Map<STPrimitiveType.Primitive, String> map = new HashMap<>();

    // NULL and UNDEFINED not implemented here
    map.put(STPrimitiveType.Primitive.OBJECT, "Object");
    map.put(STPrimitiveType.Primitive.BOOLEAN, "Boolean");
    map.put(STPrimitiveType.Primitive.NUMBER, "Number");
    map.put(STPrimitiveType.Primitive.STRING, "String");

    return map;
  }

  public static JavaPackage compileAll (Map<String, STNamespace> stNamespaces) {
    JavaPackage javaPackage = new JavaPackage("org.ooml.oomlc.env");

    JavaClass window = new JavaClass(REGULAR, "window");
    window.isFinal = true;
    window.imports.add("java.util.ArrayList");
    window.imports.add("java.util.Date");
    window.imports.add("java.util.Iterator");
    window.imports.add("java.util.Map");
    window.imports.add("java.util.Optional");
    window.imports.add("org.ooml.oomlc.env.NotNull");
    window.imports.add("org.ooml.oomlc.env.Nullable");
    javaPackage.classes.add(window);

    javaPackage.classes.addAll(Arrays.asList(JavaBuiltin.CLASSES));

    for (Map.Entry<String, STNamespace> stNamespace : stNamespaces.entrySet()) {
      try {
        new JavaCompiler(null, window, stNamespace.getValue())
          .compile();
      } catch (Exception e) {
        throw new RuntimeException(format("%s\n  while compiling %s", e.toString(), stNamespace.getKey()), e);
      }
    }

    return javaPackage;
  }

  private void compile () {
    if (compiled) {
      throw new InternalStateError("Namespace already compiled to Java");
    }
    compiled = true;

    // Compile type aliases first as they are directly substitued into where they're used
    for (Map.Entry<String, STType> stTypeAlias : stNamespace.getTypeAliases().entrySet()) {
      String name = stTypeAlias.getKey();
      STType stType = stTypeAlias.getValue();
      JavaType type;

      if (stType.getTypeType() == STType.TypeType.STRING_LITERAL) {
        // Single string literal
        type = createEnumType(false, name, UtilJava.listFrom(((STStringLiteralType) stType).getValue()));
      } else {
        type = compileType(stType, name);
      }

      compiledTypeAliases.put(name, type);
    }

    // Compile functions
    for (Map.Entry<String, STCallableOverloads> stOverloads : stNamespace.getFunctions().entrySet()) {
      String name = stOverloads.getKey();
      STCallableOverloads stCallables = stOverloads.getValue();

      for (STCallable stCallable : stCallables.getSignatures()) {
        for (JavaClassMethod method : compileCallable(name, stCallable, null)) {
          method.isStatic = true;
          namespace.methods.add(method);
        }
      }
    }

    // Compile interfaces
    while (!interfacesQueue.isEmpty()) {
      String name = interfacesQueue.get(0);
      processInterface(name);
    }

    // Compile namespaces
    for (Map.Entry<String, STNamespace> stNestedNs : stNamespace.getNestedNamespaces().entrySet()) {
      String name = stNestedNs.getKey();
      STNamespace stNs = stNestedNs.getValue();

      JavaClass namespace = new JavaClass(ABSTRACT, name);
      new JavaCompiler(this, namespace, stNs).compile();
      this.namespace.nestedClasses.add(namespace);
    }

    // Compile variables last as some will export interfaces that need to be already compiled
    for (Map.Entry<String, STType> stVar : stNamespace.getVariables().entrySet()) {
      String name = stVar.getKey();
      STType stType = stVar.getValue();
      Position position = stType.getPosition();

      if (stType.getTypeType() == STType.TypeType.REFERENCE) {
        String reference = ((STReferenceType) stType).getReference();
        if (Pattern.compile("^" + Pattern.quote(name) + "(Constructor)?$").matcher(reference).matches()) {
          processInterfaceExport(
            position,
            UtilJava.find(namespace.nestedClasses, compiled -> compiled.name.equals(reference)));
          continue;
        }
      }

      if (stType.getTypeType() == STType.TypeType.INLINE_INTERFACE) {
        JavaClass compiled = compileInterfaceBody(((STInlineInterfaceType) stType).getInterfaceBody(), name);
        processInterfaceExport(position, compiled);
        continue;
      }

      JavaClassVariable variable = new JavaClassVariable(true, true, compileType(stType, name), name);
      namespace.variables.add(variable);
    }
  }

  private void processInterface (String name) {
    if (!interfacesQueue.contains(name)) {
      return;
    }
    interfacesQueue.remove(name);

    STInterfaceStatement stIntfStmt = stNamespace.getInterfaces().get(name);
    STInterfaceBody stIntfBody = stIntfStmt.getInterfaceBody();

    if (name.endsWith("EventType")) {
      processEventMap(stIntfStmt);

    } else if (stIntfBody.getConstructors().isEmpty() &&
               stIntfBody.getIndexSignature() == null &&
               stIntfBody.getProperties().isEmpty() &&
               stIntfBody.getMethods().isEmpty() &&
               stIntfBody.getCallSignatures().size() == 1) {
      processFunctionalInterface(stIntfStmt);

    } else {
      JavaClass intface = compileInterfaceBody(stIntfBody, name);

      JavaClass existingClass = UtilJava.find(namespace.nestedClasses, c -> c.name.equals(name));

      if (existingClass == null) {
        existingClass = intface;
        namespace.nestedClasses.add(intface);

      } else {
        // Assumed that index and call signatures do not overlap
        existingClass.constructors.addAll(intface.constructors);
        existingClass.variables.addAll(intface.variables);
        existingClass.methods.addAll(intface.methods);
      }

      if ((existingClass.genericParameters.isEmpty() && existingClass.extendsClasses.isEmpty() &&
           existingClass.implementsClasses.isEmpty()) &&
          (!stIntfStmt.getGenericParameters().isEmpty() || !stIntfStmt.getParents().isEmpty())) {
        // All declarations of the same interface should have the same generic parameters and parents
        // However, if a static-side class refers to a non-existent prototype class because the prototype class hasn't been loaded yet,
        // a skeleton prototype class is created, which won't have generic parameters or parents

        existingClass.genericParameters.addAll(Util.map(stIntfStmt.getGenericParameters(), this::compileGenericParameter));

        for (STType stParent : stIntfStmt.getParents()) {
          JavaType parent = compileParentDeclaration(stParent);

          if (parent.reference.equals("Iterable")) {
            JavaType iteratorReturnType = new JavaType("Iterator");
            iteratorReturnType.genericArguments = parent.genericArguments;

            existingClass.methods.add(new JavaClassMethod(iteratorReturnType, "iterator"));

            existingClass.implementsClasses.add(parent.toString());

          } else {
            String parentClassName = parent.reference;
            processInterface(parentClassName);

            JavaClass parentClass = UtilJava.find(namespace.nestedClasses, c -> c.name.equals(parentClassName));

            if (existingClass.classType != INTERFACE && parentClass != null && parentClass.classType == INTERFACE) {
              existingClass.implementsClasses.add(parent.toString());
            } else {
              existingClass.extendsClasses.add(parent.toString());
            }
          }
        }
      }

    }
  }

  private void processFunctionalInterface (STInterfaceStatement stIntfStmt) {
    String name = stIntfStmt.getName();

    if (!stIntfStmt.getParents().isEmpty()) {
      throw new MalformedSyntaxException("Functional interface has parents", stIntfStmt.getPosition());
    }

    STInterfaceBody stIntfBody = stIntfStmt.getInterfaceBody();

    List<JavaClassMethod> overloads = compileCallable("apply", stIntfBody
      .getCallSignatures()
      .get(0)
      .getCallable(), name);

    if (overloads.size() != 1) {
      throw new MalformedSyntaxException("Functional interface overloads to more than one method", stIntfStmt.getPosition());
    }

    JavaClassMethod signature = overloads.get(0);

    JavaFunctionalInterface functionalInterface = new JavaFunctionalInterface(name, signature);
    functionalInterface.genericParameters = Util.map(stIntfStmt.getGenericParameters(), this::compileGenericParameter);

    namespace.nestedClasses.add(functionalInterface);
  }

  private void processInterfaceExport (Position position, JavaClass staticClass) {
    JavaClassVariable prototype = UtilJava.findAndRemove(staticClass.variables, v -> v.name.equals("prototype"));
    String baseClassName = prototype == null ? null : prototype.type.reference;

    if (!staticClass.genericParameters.isEmpty()) {
      throw new MalformedSyntaxException("Static-side interface has generic parameters", position);
    }

    if (!staticClass.extendsClasses.isEmpty() || !staticClass.implementsClasses.isEmpty()) {
      throw new MalformedSyntaxException("Static-side interface has parents", position);
    }

    for (JavaClassVariable variable : staticClass.variables) {
      variable.isStatic = true;
    }

    for (JavaClassMethod method : staticClass.methods) {
      method.isStatic = true;
    }

    if (baseClassName != null) {
      JavaClass baseClass = UtilJava.find(namespace.nestedClasses, compiled -> compiled.name.equals(baseClassName));

      if (baseClass == null) {
        // Base class hasn't been declared yet (probably in another file)
        baseClass = new JavaClass(baseClassName);
        namespace.nestedClasses.add(baseClass);
      }

      // Static class will be merged, so remove it if it isn't inline
      namespace.nestedClasses.remove(staticClass);

      if (!baseClass.constructors.isEmpty()) {
        throw new MalformedSyntaxException(
          "Prototype interface has constructors",
          position);
      }

      for (JavaClassConstructor constructor : staticClass.constructors) {
        constructor.className = baseClass.name;
        baseClass.constructors.add(constructor);
      }

      baseClass.variables.addAll(staticClass.variables);

      baseClass.methods.addAll(staticClass.methods);
    }
  }

  private void processEventMap (STInterfaceStatement stIntfStmt) {
    String eventTypeName = stIntfStmt.getName();
    JavaClass eventTypeClass = new JavaClass(INTERFACE, eventTypeName);

    // Don't add parents (see EventTarget.md)

    for (Map.Entry<String, STInterfaceProperty> map : stIntfStmt.getInterfaceBody().getProperties().entrySet()) {
      String specificEventName = map.getKey();
      String eventClass = ((STReferenceType) map.getValue().getType()).getReference();

      JavaClass specificEvent = new JavaClass(ABSTRACT, specificEventName);
      specificEvent.extendsClasses.add(eventClass);
      specificEvent.implementsClasses.add(eventTypeName);
      eventTypeClass.nestedClasses.add(specificEvent);
    }

    namespace.nestedClasses.add(eventTypeClass);
  }

  private JavaType compileParentDeclaration (STType stParent) {
    JavaType compiled;
    if (stParent.getTypeType() == STType.TypeType.REFERENCE) {
      compiled = compileReferenceType((STReferenceType) stParent);
    } else {
      compiled = compileGenericType((STGenericType) stParent);
    }
    return compiled;
  }

  private JavaClass compileInterfaceBody (STInterfaceBody stIntf, String forName) {
    JavaClass i = new JavaClass(forName);

    boolean isJavaAbstract = stIntf.hasAnnotation(STAnnotation.Type.ABSTRACT);
    boolean isJavaInterface = stIntf.hasAnnotation(STAnnotation.Type.INTERFACE);
    boolean isJavaStatic = stIntf.hasAnnotation(STAnnotation.Type.STATIC);

    i.classType = isJavaAbstract ? ABSTRACT : isJavaInterface ? INTERFACE : REGULAR;

    for (STInterfaceCallSignature stCall : stIntf.getCallSignatures()) {
      i.methods.addAll(compileCallable("__call", stCall.getCallable(), forName));
    }

    // Compile index signature
    STInterfaceIndexSignature stIndexSig = stIntf.getIndexSignature();
    if (stIndexSig != null) {
      JavaType paramType = compileType(stIndexSig.getType(), forName + "IndexQuery");
      JavaType returnType = compileType(stIndexSig.getReturnType(), forName + "IndexReturn");
      i.methods.add(new JavaClassMethod(false, null, returnType, "__getIndex", new JavaClassMethodParameter[]{
        new JavaClassMethodParameter("index", paramType),
      }));
      if (!stIndexSig.isReadOnly()) {
        i.methods.add(new JavaClassMethod(false, null, createVoidType(), "__setIndex", new JavaClassMethodParameter[]{
          new JavaClassMethodParameter("index", paramType),
          new JavaClassMethodParameter("value", returnType),
        }));
      }
    }

    // Compile constructors
    if (isJavaStatic) {
      if (!stIntf.getConstructors().isEmpty()) {
        throw new MalformedSyntaxException("Static-annotated interface body has constructor", stIntf.getPosition());
      }
      i.constructors.add(new JavaClassConstructor(true, forName));
    }
    for (STInterfaceConstructor stConstructor : stIntf.getConstructors()) {
      for (List<JavaClassMethodParameter> overloadSignature : compileSignature(stConstructor
          .getCallable()
          .getParameters(),
        forName + "Constructor")) {
        JavaClassConstructor constructor = new JavaClassConstructor(forName);
        constructor.parameters = overloadSignature;
        i.constructors.add(constructor);
      }
    }

    // Compile properties
    for (Map.Entry<String, STInterfaceProperty> stPropEntry : stIntf.getProperties().entrySet()) {
      String name = stPropEntry.getKey();
      STInterfaceProperty stProp = stPropEntry.getValue();

      boolean isReadOnly = stProp.isReadOnly();

      JavaType type = compileType(stProp.getType(), forName + UtilJava.capitalise(name) + "Property");
      type.isNullable = stProp.isOptional();


      JavaClassVariable variable = new JavaClassVariable(
        isReadOnly,
        type,
        name
      );

      // Don't just set isStatic = isJavaStatic as property may have own annotation
      if (isJavaStatic) {
        variable.isStatic = true;
      }

      if (variable.isStatic || !isJavaInterface) {
        i.variables.add(variable);
      } else {
        JavaClassMethod getter = new JavaClassMethod(type, "get" + UtilJava.capitalise(name));
        i.methods.add(getter);

        if (!variable.isFinal) {
          JavaClassMethod setter = new JavaClassMethod(createVoidType(), "set" + UtilJava.capitalise(name));
          setter.parameters.add(new JavaClassMethodParameter("value", type));
          i.methods.add(setter);
        }
      }
    }

    // Compile methods
    for (STInterfaceMethod stMethod : stIntf.getMethods()) {
      String name = stMethod.getName();

      for (JavaClassMethod method : compileCallable(name, stMethod.getCallable(), forName)) {
        // Don't just set isStatic = isJavaStatic as method may have own annotation
        if (isJavaStatic) {
          method.isStatic = true;
        }

        i.methods.add(method);
      }
    }

    return i;
  }

  private List<JavaClassMethod> compileCallable (String name, STCallable stCall, String forName /* Can be null */) {
    List<JavaClassMethod> overloads = new ArrayList<>();

    forName = (forName == null ? "" : forName) + UtilJava.capitalise(name);

    List<JavaGenericParameter> genericParameters = new ArrayList<>();
    for (STGenericParameter stGenParam : stCall.getGenericParameters()) {
      genericParameters.add(this.compileGenericParameter(stGenParam));
    }

    STType stRetType = stCall.getReturnType();
    JavaType returnType = compileType(stRetType, forName + "Return");

    List<STCallableParameter> stParameters = stCall.getParameters();

    if (stParameters.isEmpty()) {
      JavaClassMethod overload = new JavaClassMethod(
        returnType,
        name
      );
      overload.genericParameters = genericParameters;
      overloads.add(overload);

    } else {
      for (List<JavaClassMethodParameter> overloadSignature : compileSignature(stCall.getParameters(), forName)) {
        JavaClassMethod overload = new JavaClassMethod(
          returnType,
          name
        );
        overload.genericParameters = genericParameters;
        overload.parameters = overloadSignature;
        overloads.add(overload);
      }
    }

    return overloads;
  }

  private JavaGenericParameter compileGenericParameter (STGenericParameter stGenParam) {
    JavaGenericParameter genericParameter = new JavaGenericParameter(
      stGenParam.getName()
    );

    for (STType stBound : stGenParam.getBounds()) {
      genericParameter.upperBounds.add(compileGenericParameterBoundOrArgument(stBound));
    }

    return genericParameter;
  }

  private JavaType compileGenericParameterBoundOrArgument (STType stType) {
    switch (stType.getTypeType()) {
    case ANY:
      return createAnyType();

    case PRIMITIVE:
      return compilePrimitiveType((STPrimitiveType) stType);

    case REFERENCE:
      return compileReferenceType((STReferenceType) stType);

    case GENERIC:
      return compileGenericType((STGenericType) stType);

    case ARRAY:
      return compileArrayType((STArrayType) stType, null);

    case UNION:
      return compileUnionType((STUnionType) stType, null);

    default:
      throw new MalformedSyntaxException(
        "Invalid generic parameter bound or argument",
        stType.getPosition());
    }
  }

  private List<List<JavaClassMethodParameter>> compileSignature (List<STCallableParameter> signature, String forNamePrefix) {
    if (signature.isEmpty()) {
      return new ArrayList<>();
    }

    STCallableParameter stFirstParam = signature.get(0);
    STType stFirstType = stFirstParam.getType();

    String name = stFirstParam.getName();
    String forName = forNamePrefix + UtilJava.capitalise(name);

    boolean variableLength = stFirstParam.isVariableLength();
    boolean optional = stFirstParam.isOptional();

    if (variableLength) {
      if (stFirstType.getTypeType() != STType.TypeType.ARRAY) {
        throw new MalformedSyntaxException("Variable length argument does not have array type", stFirstParam.getPosition());
      }
      stFirstType = ((STArrayType) stFirstType).getElementType();
    }

    List<JavaClassMethodParameter> firstParamOverloads = new ArrayList<>();

    switch (stFirstType.getTypeType()) {
    case UNION:
      STNormalisedUnionType stNormalUnion = STNormalisedUnionType.from((STUnionType) stFirstType);

      for (STType stFirstTypeUnrolled : stNormalUnion.getSubtypes()) {
        JavaClassMethodParameter firstParamOverload = new JavaClassMethodParameter(
          variableLength,
          name,
          // This will make sure it's a compatible type
          compileType(stFirstTypeUnrolled, forName)
        );
        if (stNormalUnion.isNullable()) {
          firstParamOverload.type.isNullable = true;
        }
        firstParamOverloads.add(firstParamOverload);
      }

      if (!stNormalUnion.getLiterals().isEmpty()) {
        JavaClass enumClass = new JavaClass(ENUM, forName + "Value");
        enumClass.enumValues = stNormalUnion.getLiterals();
        namespace.nestedClasses.add(enumClass);

        firstParamOverloads.add(new JavaClassMethodParameter(name, new JavaType(enumClass.name)));
      }
      break;

    default:
      JavaClassMethodParameter firstParamOverload = new JavaClassMethodParameter(
        variableLength,
        name,
        // This will make sure it's a compatible type
        compileType(stFirstType, forName)
      );
      firstParamOverloads.add(firstParamOverload);
    }

    List<List<JavaClassMethodParameter>> overloads = new ArrayList<>();
    for (JavaClassMethodParameter firstParamOverload : firstParamOverloads) {
      if (signature.size() > 1) {
        for (List<JavaClassMethodParameter> otherParamsSubsets : compileSignature(signature.subList(1, signature.size()), forNamePrefix)) {
          List<JavaClassMethodParameter> overload = new ArrayList<>();
          overload.add(firstParamOverload);
          overload.addAll(otherParamsSubsets);
          overloads.add(overload);
        }

      } else {
        List<JavaClassMethodParameter> overload = new ArrayList<>();
        overload.add(firstParamOverload);
        overloads.add(overload);
      }
    }

    if (optional) {
      overloads.add(new ArrayList<>());
    }

    return overloads;
  }

  private JavaType compileType (STType stType, String forName /* Can be null */) {
    STType.TypeType typeType = stType.getTypeType();
    Position position = stType.getPosition();

    switch (typeType) {
    case ARRAY:
      return compileArrayType((STArrayType) stType, forName);

    case CALLABLE:
      return compileCallableType((STCallableType) stType, forName);

    case INLINE_INTERFACE:
      return compileInlineInterfaceType((STInlineInterfaceType) stType, forName);

    case PRIMITIVE:
      return compilePrimitiveType((STPrimitiveType) stType);

    case REFERENCE:
      return compileReferenceType((STReferenceType) stType);

    case GENERIC:
      return compileGenericType((STGenericType) stType);

    case ANY:
      return createAnyType();

    case UNION:
      return compileUnionType((STUnionType) stType, forName);

    case PREDICATE:
      return new JavaType(PRIMITIVE_TYPES.get(STPrimitiveType.Primitive.BOOLEAN));

    case VOID:
      return createVoidType();

    default:
      throw new MalformedSyntaxException(format("Unsupported type \"%s\"", typeType), position);
    }
  }

  private JavaType compileCallableType (STCallableType stCallType, String forName) {
    List<JavaClassMethod> overloads = compileCallable("apply", stCallType.getCallable(), forName);

    if (overloads.size() != 1) {
      throw new MalformedSyntaxException("Callable type overloads to more than one method", stCallType.getPosition());
    }

    JavaClassMethod signature = overloads.get(0);

    JavaFunctionalInterface functionalInterface = new JavaFunctionalInterface(forName, signature);

    namespace.nestedClasses.add(functionalInterface);

    return new JavaType(functionalInterface.name);
  }

  private JavaType compileArrayType (STArrayType stArrayType, String forName /* Could be null, let exception throw */) {
    STType stElemType = stArrayType.getElementType();

    JavaType elementType;

    switch (stElemType.getTypeType()) {
    case ANY:
    case ARRAY:
    case CALLABLE:
    case GENERIC:
    case PRIMITIVE:
    case REFERENCE:
    case UNION:
      elementType = compileType(stElemType, forName + "Element");
      break;

    default:
      throw new MalformedSyntaxException(format("Unsupported array type element type \"%s\"", stElemType.getTypeType()), stArrayType
        .getPosition());
    }

    return UtilJava.wrapType("ArrayList", elementType);
  }

  private JavaType compileInlineInterfaceType (STInlineInterfaceType stInlineType, String forName) {
    JavaClass inlineInterface = compileInterfaceBody(stInlineType.getInterfaceBody(), forName);

    namespace.nestedClasses.add(inlineInterface);

    return new JavaType(inlineInterface.name);
  }

  private JavaType compileReferenceType (STReferenceType stRefType) {
    String reference = stRefType.getReference();

    switch (reference) {
    case "ReadonlyArray":
    case "Array":
      reference = "ArrayList";
      break;

    case "__Class":
      reference = "Class";
      break;

    case "__Tuple2":
      reference = "Map.Entry";
      break;

    case "__Iterator":
      reference = "Iterator";
      break;

    case "__Iterable":
      reference = "Iterable";
      break;

    default:
      if (compiledTypeAliases.containsKey(reference)) {
        return compiledTypeAliases.get(reference);
      }
    }

    return new JavaType(reference);
  }

  private JavaType compileGenericType (STGenericType stGenericType) {
    JavaType type = compileReferenceType(stGenericType.getReferenceType());

    type.genericArguments = Util.map(
      stGenericType.getGenericArguments(),
      stGenArg -> {
        if (stGenArg.getTypeType() == STType.TypeType.VOID) {
          return new JavaType("Void");
        }
        return compileGenericParameterBoundOrArgument(stGenArg);
      });

    return type;
  }

  private JavaType compilePrimitiveType (STPrimitiveType stPrimType) {
    String syntax = PRIMITIVE_TYPES.get(stPrimType.getPrimitive());

    if (syntax == null) {
      throw new MalformedSyntaxException(
        format("Unknown primitive type \"%s\"", stPrimType.getPrimitive()),
        stPrimType.getPosition());
    }

    return new JavaType(syntax);
  }

  private JavaType compileUnionType (STUnionType stUnionType, String forName /* Can be null */) {
    STNormalisedUnionType stNormalUnion = STNormalisedUnionType.from(stUnionType);
    boolean nullable = stNormalUnion.isNullable();
    List<STType> stSubtypes = stNormalUnion.getSubtypes();
    List<String> literalSubtypes = stNormalUnion.getLiterals();

    if (stSubtypes.size() == 1) {
      JavaType onlyType = compileType(stSubtypes.get(0), forName);
      onlyType.isNullable = nullable;
      return onlyType;
    }

    if (forName != null && stSubtypes.isEmpty() && !literalSubtypes.isEmpty()) {
      return createEnumType(nullable, forName, literalSubtypes);
    }

    // TODO Reasearch transformation method where common interface is created and implemented on subtype classes

    return createAnyType();
  }

  private JavaType createEnumType (boolean nullable, String name, List<String> values) {
    JavaClass enumClass = new JavaClass(ENUM, name);
    enumClass.enumValues = values;
    namespace.nestedClasses.add(enumClass);
    return new JavaType(nullable, enumClass.name);
  }
}
