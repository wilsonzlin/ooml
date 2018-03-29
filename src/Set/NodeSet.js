let NodeSet;
if (OOMLCompatSetExists) {
  NodeSet = Set;
} else {
  let NODESET_NODE_PROPNAME_NODEID_PREFIX = "__nodeSetId";
  let NODESET_PROPNAME_NODESETID = "__nodeSetId";
  let NODESET_PROPNAME_AUTOINCREMENT = "__nodeSetAutoIncrement";
  let NODESET_PROPNAME_INTERNALARRAY = "__nodeSetInternalArray";
  let NodeSetCount = 0; // Start from zero so falsey checks won't false positive
  NodeSet = function () {
    let _this = this;

    _this[NODESET_PROPNAME_NODESETID] = ++NodeSetCount;
    _this[NODESET_PROPNAME_AUTOINCREMENT] = 0; // Start from zero so falsey checks won't false positive
    _this[NODESET_PROPNAME_INTERNALARRAY] = [];
  };
  let NodeSetProto = NodeSet.prototype;
  NodeSetProto.add = function (node) {
    let nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    if (!node[nodeIdPropName]) {
      let nodeId = node[nodeIdPropName] = ++this[NODESET_PROPNAME_AUTOINCREMENT];
      this[NODESET_PROPNAME_INTERNALARRAY][nodeId] = node;
    }
    return this;
  };
  NodeSetProto.clear = function () {
    let nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    this[NODESET_PROPNAME_INTERNALARRAY].forEach((node) => {
      delete node[nodeIdPropName];
    });
    this[NODESET_PROPNAME_INTERNALARRAY] = [];
    this[NODESET_PROPNAME_AUTOINCREMENT] = 0;
  };
  NodeSetProto.delete = function (node) {
    let nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    let nodeId = node[nodeIdPropName];
    if (nodeId) {
      delete this[NODESET_PROPNAME_INTERNALARRAY][nodeId];
      delete node[nodeIdPropName];
      return true;
    }
    return false;
  };
  NodeSetProto.forEach = function (callback, thisArg) {
    let _this = this;
    this[NODESET_PROPNAME_INTERNALARRAY].forEach((node, index) => {
      callback.call(thisArg, node, index, _this);
    });
  };
  NodeSetProto.has = function (node) {
    let nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    return !!node[nodeIdPropName];
  };
  NodeSetProto.values = function () {
    // .filter callback is never called on deleted/non-set indexes
    // and is probably faster than .map
    return this[NODESET_PROPNAME_INTERNALARRAY].filter(() => true);
  };

  Object.defineProperty(NodeSetProto, "size", {
    get: function () {
      return this[NODESET_PROPNAME_INTERNALARRAY].length;
    },
  });
}
