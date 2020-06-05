const throwIllegalFunctionInExpressionError = () => {
  throw new SyntaxError('Illegal function or class inside binding expression');
};

const createBinding = (t, boundProps, expr) => t.objectExpression([
  t.objectProperty(t.identifier('boundProps'), t.arrayExpression(boundProps.map(v => t.stringLiteral(v)))),
  t.objectProperty(t.identifier('compute'), t.functionExpression(null, [], t.blockStatement([
    t.returnStatement(expr),
  ]))),
]);

const parseExpressionContainer = (t, jsxExprPath) => {
  const boundVariables = [];

  jsxExprPath.traverse({
    ArrowFunctionExpression: throwIllegalFunctionInExpressionError,
    ClassDeclaration: throwIllegalFunctionInExpressionError,
    ClassExpression: throwIllegalFunctionInExpressionError,
    FunctionDeclaration: throwIllegalFunctionInExpressionError,
    FunctionExpression: throwIllegalFunctionInExpressionError,
    MemberExpression ({node: {object, property}}) {
      if (t.isThisExpression(object) && t.isIdentifier(property)) {
        boundVariables.push(property.name);
      }
    },
  });
  return createBinding(t, boundVariables, jsxExprPath.node.expression);
};

const transformAttr = (t, jsxAttrPath) => {
  const valuePath = jsxAttrPath.get('value');
  return t.objectExpression([
    t.objectProperty(t.identifier('name'), t.stringLiteral(jsxAttrPath.node.name.name)),
    t.objectProperty(
      t.identifier('binding'),
      t.isJSXExpressionContainer(valuePath.node) ? parseExpressionContainer(t, valuePath) : createBinding(t, [], valuePath.node),
    ),
  ]);
};

const transformElem = (t, jsxElemPath) => {
  return t.objectExpression([
    t.objectProperty(t.identifier('name'), t.stringLiteral(jsxElemPath.node.openingElement.name.name)),
    t.objectProperty(t.identifier('attrs'), t.arrayExpression(jsxElemPath.node.openingElement.attributes.map((_, i) => transformAttr(t, jsxElemPath.get(`openingElement.attributes.${i}`))))),
    t.objectProperty(t.identifier('children'), t.arrayExpression(jsxElemPath.node.children.map((_, i) => transformChild(t, jsxElemPath.get(`children.${i}`))))),
  ]);
};

const transformChild = (t, jsxChildPath) => {
  const jsxChild = jsxChildPath.node;
  if (t.isJSXText(jsxChild)) {
    return t.stringLiteral(jsxChild.value);
  } else if (t.isJSXExpressionContainer(jsxChild)) {
    return parseExpressionContainer(t, jsxChildPath);
  } else if (t.isJSXElement(jsxChild)) {
    return transformElem(t, jsxChildPath);
  } else {
    throw new SyntaxError('Invalid child');
  }
};

module.exports = function ({types: t}) {
  return ({
    visitor: {
      JSXElement (path, state) {
        path.replaceWith(transformElem(t, path));
      },
    },
  });
};
