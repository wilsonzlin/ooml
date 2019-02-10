oomlExpositionPrototype[__IP_OOML_EXPO_PROTO_CLEAR_RENDERING_ID] = function (rendering_id) {
  let _this = this;
  let map = _this[__IP_OOML_EXPO_OWN_RENDERINGID_NODEIDXS_MAP];
  let nodes = _this[__IP_OOML_EXPO_OWN_NODES];

  if (map[rendering_id]) {
    u_iterate(map[rendering_id], idx => {
      delete nodes[idx];
    });
    delete map[rendering_id];
  }
};
