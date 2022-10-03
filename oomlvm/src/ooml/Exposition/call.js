oomlExpositionPrototype.call = function () {
  let method = arguments[0];
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  u_iterate(this[__IP_OOML_EXPO_OWN_NODES], n => {
    n[method].apply(n, args);
  });
};
