u_iterate(["includes", "indexOf", "lastIndexOf"], method_name => {
  oomlTablePrototype[method_name] = function (search_elem, from_idx) {
    let _this = this;

    assert_instanceof_r("search element", search_elem, _this[__IP_OOML_ARRAY_OWN_ELEMENT_TYPE]);

    from_idx = _this[__IP_OOML_ARRAY_PROTO_NORMALISE_INDEX]("from", from_idx);

    return _this[__IP_OOML_ARRAY_OWN_INTERNAL_ARRAY][method_name](search_elem, from_idx);
  };
});
