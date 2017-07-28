Utils.DOM.setData = (domElem, key, value) => {
    if (OOMLCompatDatasetExists) {
        domElem.dataset[key] = value;
    } else {
        domElem.setAttribute('data-' + Utils.toDashCase(key), value);
    }
};
