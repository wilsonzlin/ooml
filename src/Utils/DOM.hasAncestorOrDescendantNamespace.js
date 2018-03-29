Utils.DOM.hasAncestorOrDescendantNamespace = rootElem => {
  let toCheck, current;

  toCheck = rootElem;
  while (toCheck) {
    if (toCheck[OOML_DOM_PROPNAME_ISNAMESPACE]) {
      return true;
    }
    toCheck = toCheck.parentNode;
  }

  toCheck = [rootElem];
  while (current = toCheck.shift()) {
    if (current[OOML_DOM_PROPNAME_ISNAMESPACE]) {
      return true;
    }
    toCheck.push(current.children);
  }

  return false;
};
