const throwIllegalFunctionInExpressionError = () => {
  throw new SyntaxError('Illegal function or class inside binding expression');
};

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
  return t.objectExpression([
    t.objectProperty(t.identifier('boundProps'), t.arrayExpression(boundVariables.map(v => t.stringLiteral(v)))),
    t.objectProperty(t.identifier('compute'), t.functionExpression(null, [], t.blockStatement([
      t.returnStatement(jsxExprPath.node.expression),
    ]))),
  ]);
};

const transformAttr = (t, jsxAttrPath) => {
  return t.objectExpression([
    t.objectProperty(t.identifier('name'), t.stringLiteral(jsxAttrPath.node.name.name.toLowerCase())),
    t.objectProperty(t.identifier('binding'), parseExpressionContainer(t, jsxAttrPath.get('value'))),
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
