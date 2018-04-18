oomlArrayPrototype[__IP_OOML_ARRAY_PROTO_REINSERT_DOM_ELEMENTS] = function () {
  let arr = this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY];

  let array_dom_element = this[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];

  arr.reduce((previousElem, elem) => {
    previousElem.parentNode.insertBefore(elem[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT], previousElem.nextSibling);
    return elem[__IP_OOML_EVENTSOURCE_OWN_DOM_ELEMENT];
  }, array_dom_element);
};
