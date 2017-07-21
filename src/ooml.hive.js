let { hive, hiveBind, hiveUnbind } = (() => {
    let reservedKeys = new StringSet(["get", "set", "delete"]);

    let isValidKey = key => Utils.typeOf(key, TYPEOF_STRING) && key.length > 0 && /^__/.test(key) && key.indexOf('.') == -1 && OOMLReservedPropertyNames.indexOf(key) == -1 && !reservedKeys.has(key);
    let assertValidKey = key => {
        if (!isValidKey(key)) {
            throw new SyntaxError(`Invalid hive key name "${key}"`);
        }
    };

    let HiveObject = function(keypath, initialState) {
        // Internal only class, so don't need checks
        let _this = this;
        _this[OOML_HIVE_PROPNAME_KEYPATH] = keypath;
        _this[OOML_HIVE_PROPNAME_INTERNALHIVE] = Utils.createCleanObject();

        if (initialState) {
            Object.keys(initialState).forEach(k => {
                _this.set(k, initialState[k]);
            });
        }
    };

    let HiveObjectPrototype = HiveObject.prototype;
    HiveObjectPrototype.get = function(key) {
        assertValidKey(key);

        return this[OOML_HIVE_PROPNAME_INTERNALHIVE][key];
    };
    HiveObjectPrototype.set = function(key, value) {
        assertValidKey(key);

        let _this = this;
        let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];
        let propertyKeypath = _this[OOML_HIVE_PROPNAME_KEYPATH] + "." + key;

        if (Utils.isObjectLiteral(value)) {
            internalHive[key] = HiveObject(propertyKeypath, value);
        } else if (Array.isArray(value)) {
            internalHive[key] = new HiveArray(propertyKeypath)
        } else if (Utils.isPrimitiveValue(value)) {
            let currentValue = internalHive[key];
            internalHive[key] = value;
            let bindings = bindingsByKeypath[propertyKeypath];
            if (bindings) {
                bindings.forEach(binding => {
                    let {object, property} = binding;
                    if (currentValue === undefined) {
                        // This will handle assigning the value, so that the handler can optionally prevent it from happening
                        object[OOML_INSTANCE_PROPNAME_BINDING_ON_EXIST](property, value);
                    } else {
                        object[property] = value;
                    }
                });
            }
        } else {
            throw new TypeError(`Invalid hive value for key "${propertyKeypath}"`);
        }
    };
    HiveObjectPrototype.delete = function(key) {
        assertValidKey(key);

        let _this = this;
        let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];
        let propertyKeypath = _this[OOML_HIVE_PROPNAME_KEYPATH] + "." + key;

        let value = internalHive[key];
        delete internalHive[key];

        if (value instanceof HiveObject || value instanceof HiveArray) {
            value.deleteAll();
        } else {
            let bindings = bindingsByKeypath[propertyKeypath];
            if (bindings) {
                bindings.forEach(binding => {
                    let {object, property} = binding;
                    // This should also handle resetting the property to the default value
                    object[OOML_INSTANCE_PROPNAME_BINDING_ON_MISSING](property);
                });
            }
        }
    };
    HiveObjectPrototype.deleteAll = function() {
        let _this = this;
        let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];

        Object.keys(internalHive).forEach(k => {
            _this.delete(k);
        });
    };
    HiveObjectPrototype.toObject = function() {
        let _this = this;
        let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];

        let obj = Utils.createCleanObject();
        Object.keys(internalHive).forEach(k => {
            let value = internalHive[k];

            if (value instanceof HiveObject) {
                value = value.toObject();
            } else if (value instanceof HiveArray) {
                value = value.toArray();
            }

            obj[k] = value;
        });

        return obj;
    };
    HiveObjectPrototype.toJSON = function(indentation) {
        if (!Utils.isType("natural", indentation)) {
            throw new TypeError(`Invalid indentation value`);
        }
        return JSON.stringify(this.toObject(), null, indentation);
    };

    let HiveArray = function() {

    };

    let hive = HiveObject("");

    let bindingsByKeypath = Utils.createCleanObject();

    let bindings = [];
    let hiveBind = function(keypath, object, property) {
        if (!Utils.typeOf(keypath, TYPEOF_STRING) || !keypath.split(".").every(k => isValidKey(k))) {
            throw new SyntaxError(`Invalid keypath "${keypath}"`);
        }

        keypath = `.${keypath}`; // Because keypath is chained with dot and initial keypath is empty string

        let bindingId = bindings.length;
        bindings[bindingId] = keypath; // This works beautifully
        let binding = {
            object: object,
            property: property,
        };
        if (!bindingsByKeypath[keypath]) {
            bindingsByKeypath[keypath] = [];
        }
        bindingsByKeypath[keypath][bindingId] = binding;

        return bindingId;
    };
    let hiveUnbind = function(bindingId) {
        let bindingKeypath = bindings[bindingId];
        delete bindings[bindingId];
        delete bindingsByKeypath[bindingKeypath][bindingId];
    };

    return { hive, hiveBind, hiveUnbind };
})();
