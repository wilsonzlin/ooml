oomlExpositionPrototype[__IP_OOML_EXPO_PROTO_ADD_NODE] = function (rendering_id, node) {
  let _this = this;
  let map = _this[__IP_OOML_EXPO_OWN_RENDERINGID_NODEIDXS_MAP];
  let nodes = _this[__IP_OOML_EXPO_OWN_NODES];

  if (!map[rendering_id]) {
    map[rendering_id] = [];
  }
  map[rendering_id].push(nodes.push(node) - 1);
};
