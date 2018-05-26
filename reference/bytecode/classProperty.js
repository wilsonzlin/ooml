module.exports = {
  __BC_CLASSPROP_NAME: "propName",
  __BC_CLASSPROP_TYPE: ["string", "natural", "null"] || "group.mod.ns.c" || undefined, // Undefined if default type, no type (transient only), or inheriting type
  __BC_CLASSPROP_ARRAY: true || undefined,
  __BC_CLASSPROP_DEFAULTVALUE: "the default value" || 4.35 || true || null || [] || {} || undefined, // Undefined if default default value or using inherited value
  __BC_CLASSPROP_TRANSIENT: true || undefined,
  __BC_CLASSPROP_PASSTHROUGH: "passthroughPropName" || undefined,
  __BC_CLASSPROP_GET: "someMethod" || undefined,
  __BC_CLASSPROP_SET: "someMethod" || undefined,
  __BC_CLASSPROP_CHANGE: "someMethod" || undefined,
  __BC_CLASSPROP_BINDING: ["users::", undefined, "::name"] || ["static::binding"] || [undefined] || undefined,
  __BC_CLASSPROP_BINDINGSUBMAP: {id: [1]} || undefined,
  __BC_CLASSPROP_BINDINGEXIST: "someMethod" || undefined,
  __BC_CLASSPROP_BINDINGMISSING: "someMethod" || undefined,
  __BC_CLASSPROP_DISPATCHHANDLERS: {
    "dispatchevent": "someMethod",
  } || undefined,
};
