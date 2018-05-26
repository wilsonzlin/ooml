**Fields** are essentially the same as *static variables, properties, or methods* in object orientated languages. They are values attached to a class and are usually used to store shared variables.

They are very basic and have no equivalent support for property features such as [typing](#Typing), [binding](#Binding), or [substitution](#Substitution).

To declare a field, use an `ooml-field` tag:

```html
<template ooml-class="MyClass">
  <ooml-field name="myField">null</ooml-field>
</template>
```

The value in the tag is the field's value. Fields can hold anything. They can be accessed or assigned to using normal notation:

```javascript
// Access
console.log(MyClass.myField);

// Assign to
MyClass.myField = 1;
```

Since fields can hold anything, it's easy to create what are known as *static methods* in object orientated languages:

```html
<template ooml-class="MyClass">
  <ooml-field name="myStaticMethod">
    function (arg1, arg2) {
      console.log(arg1, arg2);
    }
  </ooml-field>
</template>
```

Some fields that are functions are [special](#Special fields) to ooml and are used for special purposes.
