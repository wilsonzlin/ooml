let Utils_DOM_setData = (domElem, key, value) => {
  if (OOMLCompatDatasetExists) {
    domElem.dataset[key] = value;
  } else {
    domElem.setAttribute("data-" + Utils_toDashCase(key), value);
  }
};
