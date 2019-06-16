oomlExpositionPrototype.assign = function (obj) {
  u_iterate(this[__IP_OOML_EXPO_OWN_NODES], n => {
    u_deep_assign(n, obj);
  });
};
