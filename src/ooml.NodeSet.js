var NODESET_NODE_PROPNAME_NODEID_PREFIX = '__nodeSetId';
var NODESET_PROPNAME_NODESETID = '__nodeSetId';
var NODESET_PROPNAME_AUTOINCREMENT = '__nodeSetAutoIncrement';
var NODESET_PROPNAME_INTERNALARRAY = '__nodeSetInternalArray';
var NodeSetCount = 0; // Start from zero so falsey checks won't false positive
var NodeSet = function() {
    this[NODESET_PROPNAME_NODESETID] = ++NodeSetCount;
    this[NODESET_PROPNAME_AUTOINCREMENT] = 0; // Start from zero so falsey checks won't false positive
    this[NODESET_PROPNAME_INTERNALARRAY] = [];
};
var NodeSetProto = NodeSet.prototype;
NodeSetProto.add = function(node) {
    var nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    if (!node[nodeIdPropName]) {
        var nodeId = node[nodeIdPropName] = ++this[NODESET_PROPNAME_AUTOINCREMENT];
        this[NODESET_PROPNAME_INTERNALARRAY][nodeId] = node;
    }
    return this;
};
NodeSetProto.clear = function() {
    var nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    this[NODESET_PROPNAME_INTERNALARRAY].forEach(function(node) {
        delete node[nodeIdPropName];
    });
    this[NODESET_PROPNAME_INTERNALARRAY] = [];
    this[NODESET_PROPNAME_AUTOINCREMENT] = 0;
};
NodeSetProto.delete = function(node) {
    var nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    var nodeId = node[nodeIdPropName];
    if (nodeId) {
        delete this[NODESET_PROPNAME_INTERNALARRAY][nodeId];
        delete node[nodeIdPropName];
        return true;
    }
    return false;
};
NodeSetProto.forEach = function(callback, thisArg) {
    var that = this;
    this[NODESET_PROPNAME_INTERNALARRAY].forEach(function(node, index) {
        callback.call(this, node, index, that);
    }, thisArg);
};
NodeSetProto.has = function(node) {
    var nodeIdPropName = NODESET_NODE_PROPNAME_NODEID_PREFIX + this[NODESET_PROPNAME_NODESETID];
    return !!node[nodeIdPropName];
};
NodeSetProto.values = function() {
    // .filter callback is never called on deleted/non-set indexes
    return this[NODESET_PROPNAME_INTERNALARRAY].filter(function() { return true });
};