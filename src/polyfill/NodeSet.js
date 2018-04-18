let NodeSet;

if (__compat_Set) {
  NodeSet = Set;

} else {
  let __nodeset_id_autoincrement = 0; // Start from zero so falsy checks won't false positive

  NodeSet = function () {
    let _this = this;

    _this[__IP_NODESET_SETID] = ++__nodeset_id_autoincrement;
    _this[__IP_NODESET_AUTOINCREMENT] = 0; // Start from zero so falsey checks won't false positive
    _this[__IP_NODESET_INTERNALARRAY] = [];
  };

  let NodeSetPrototype = NodeSet.prototype;

  NodeSetPrototype.add = function (node) {
    let ip_node_id = __IP_NODESET_ELEMENT_ID_PREFIX + this[__IP_NODESET_SETID];
    if (!node[ip_node_id]) {
      let node_id = node[ip_node_id] = ++this[__IP_NODESET_AUTOINCREMENT];
      this[__IP_NODESET_INTERNALARRAY][node_id] = node;
    }
    return this;
  };

  NodeSetPrototype.clear = function () {
    let ip_node_id = __IP_NODESET_ELEMENT_ID_PREFIX + this[__IP_NODESET_SETID];
    this[__IP_NODESET_INTERNALARRAY].forEach((node) => {
      delete node[ip_node_id];
    });
    this[__IP_NODESET_INTERNALARRAY] = [];
    this[__IP_NODESET_AUTOINCREMENT] = 0;
  };

  NodeSetPrototype.delete = function (node) {
    let ip_node_id = __IP_NODESET_ELEMENT_ID_PREFIX + this[__IP_NODESET_SETID];
    let node_id = node[ip_node_id];
    if (node_id) {
      delete this[__IP_NODESET_INTERNALARRAY][node_id];
      delete node[ip_node_id];
      return true;
    }
    return false;
  };

  NodeSetPrototype.forEach = function (callback, thisArg) {
    let _this = this;
    this[__IP_NODESET_INTERNALARRAY].forEach((node, index) => {
      callback.call(thisArg, node, index, _this);
    });
  };

  NodeSetPrototype.has = function (node) {
    let ip_node_id = __IP_NODESET_ELEMENT_ID_PREFIX + this[__IP_NODESET_SETID];
    return !!node[ip_node_id];
  };

  NodeSetPrototype.values = function () {
    // .filter callback is never called on deleted/non-set indexes
    // and is probably faster than .map
    return this[__IP_NODESET_INTERNALARRAY].filter(() => true);
  };

  Object.defineProperty(NodeSetPrototype, "size", {
    get: function () {
      return this[__IP_NODESET_INTERNALARRAY].length;
    },
  });
}
