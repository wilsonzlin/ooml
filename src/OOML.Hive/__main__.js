let hiveSetup = (() => {
  let isValidKey = key => {
    if (!Utils_typeOf(key, TYPEOF_STRING) && !Utils_typeOf(key, TYPEOF_NUMBER)) {
      return false;
    }
    key = "" + key;
    return key.length > 0 && !/^__/.test(key) && key.indexOf(".") == -1;
  };
  let assertValidKey = key => {
    if (!isValidKey(key)) {
      throw SyntaxError(`Invalid hive key name "${key}"`);
    }
  };

  let HiveObject = function (keypath, initialState) {
    // Internal only class, so don't need checks
    let _this = this;
    // Don't add dot suffix if first keypath ("")
    _this[OOML_HIVE_PROPNAME_KEYPATH_PREFIX] = keypath && `${keypath}.`;
    _this[OOML_HIVE_PROPNAME_INTERNALHIVE] = Utils_createCleanObject();
    Object.freeze(_this);

    if (initialState) {
      Object.keys(initialState)
        .forEach(k => {
          _this.set(k, initialState[k]);
        });
    }
  };

  let HiveObjectPrototype = HiveObject.prototype;
  HiveObjectPrototype.get = function (key) {
    assertValidKey(key);

    return this[OOML_HIVE_PROPNAME_INTERNALHIVE][key];
  };
  HiveObjectPrototype.set = function (key, value) {
    assertValidKey(key);

    let _this = this;
    let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];
    let propertyKeypath = _this[OOML_HIVE_PROPNAME_KEYPATH_PREFIX] + key;
    let currentValue = internalHive[key];

    let newValueIsObjectLiteral = Utils_isObjectLiteral(value);

    // If new value is object/array, need to delete current value,
    // because primitive -> object/array is basically primitive -> undefined
    // as you can't bind to objects/arrays
    if (isHiveObject(currentValue) ||
        newValueIsObjectLiteral) {
      _this.delete(key);
    }

    if (newValueIsObjectLiteral) {
      internalHive[key] = new HiveObject(propertyKeypath, value);
    } else if (Utils_isPrimitiveValue(value)) {
      if (currentValue !== value) {
        // Only update if necessary
        internalHive[key] = value;
        let bindings = hive[OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH][propertyKeypath];
        if (bindings) {
          bindings.forEach(binding => {
            let object = binding.object;
            let property = binding.property;
            // This will handle assigning the value, so that the handler can optionally prevent it from happening
            object[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE](property, value);
          });
        }
      }
    } else {
      throw TypeError(`Invalid hive value for key "${propertyKeypath}"`);
    }
  };
  HiveObjectPrototype.delete = function (key) {
    assertValidKey(key);

    let _this = this;
    let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];
    let propertyKeypath = _this[OOML_HIVE_PROPNAME_KEYPATH_PREFIX] + key;

    let value = internalHive[key];
    delete internalHive[key];

    if (isHiveObject(value)) {
      value.deleteAll();
    } else {
      let bindings = hive[OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH][propertyKeypath];
      if (bindings) {
        bindings.forEach(binding => {
          let object = binding.object;
          let property = binding.property;
          // This should handle resetting the property to the default value
          object[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE](property);
        });
      }
    }
  };
  HiveObjectPrototype.deleteAll = function () {
    let _this = this;
    let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];

    Object.keys(internalHive)
      .forEach(k => {
        _this.delete(k);
      });
  };
  HiveObjectPrototype.toObject = function () {
    let _this = this;
    let internalHive = _this[OOML_HIVE_PROPNAME_INTERNALHIVE];

    let obj = Utils_createCleanObject();
    Object.keys(internalHive)
      .forEach(k => {
        let value = internalHive[k];

        if (value instanceof HiveObject) {
          value = value.toObject();
        }

        obj[k] = value;
      });

    return obj;
  };
  HiveObjectPrototype.toJSON = function (indentation) {
    return JSON.stringify(this.toObject(), undefined, indentation);
  };
  HiveObjectPrototype.assign = function () {
    let hive = this;

    for (let i = 0; i < arguments.length; i++) {
      let source = arguments[i];

      // Don't use Object.assign because 1) compatibility 2) it sets non-existent properties
      // Don't need to clone, because values that are actually copied are all primitive
      Object.keys(source)
        .forEach((prop) => hive.set(prop, source[prop]));
    }

    return hive;
  };
  if (OOMLCompatSymbolExists) {
    HiveObjectPrototype[Symbol.iterator] = function () {
      let hive = this;
      let propertyNames = Object.keys(hive[OOML_HIVE_PROPNAME_INTERNALHIVE]);
      let currentIdx = -1;

      return {
        next: () => {
          let nextProperty = propertyNames[++currentIdx];
          if (currentIdx == propertyNames.length) {
            return {done: true};
          }
          return {value: [nextProperty, hive.get(nextProperty)], done: false};
        }
      };
    };
  }

  let isHiveObject = thing => {
    return thing instanceof HiveObject;
  };

  let HiveSubscriber = function (channel) {
    this[OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS] = [];
    hive[OOML_HIVE_PROPNAME_SUBSCRIBE](channel, this);
  };
  let HiveSubscriberProto = HiveSubscriber.prototype;
  HiveSubscriberProto[OOML_HIVESUBSCRIBER_PROPNAME_RECEIVE] = function (data) {
    this[OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS].forEach(h => {
      h(data);
    });
  };
  HiveSubscriberProto.addHandler = function (handler) {
    this[OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS].push(handler);
    return this;
  };
  HiveSubscriberProto.removeHandler = function (handler) {
    let indexOf = this[OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS].indexOf(handler);
    if (indexOf > -1) {
      this[OOML_HIVESUBSCRIBER_PROPNAME_HANDLERS].splice(indexOf, 1);
    }
    return this;
  };

  let Hive = function () {
    this.store = new HiveObject("");
    this[OOML_HIVE_PROPNAME_BINDINGS] = [];
    this[OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH] = Utils_createCleanObject();

    this[OOML_HIVE_PROPNAME_SUBSCRIPTIONS] = Utils_createCleanObject();
    Object.freeze(this);
  };
  let HiveProto = Hive.prototype;
  HiveProto.bind = function (keypath, object, property) {
    let bindings = this[OOML_HIVE_PROPNAME_BINDINGS];
    let bindingsByKeypath = this[OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH];
    let hive = this.store;

    let splitKeypath;

    if (!Utils_typeOf(keypath, TYPEOF_STRING) || !(splitKeypath = keypath.split(".")).every(k => isValidKey(k))) {
      throw SyntaxError(`Invalid keypath "${keypath}"`);
    }

    let bindingId = bindings.length || 1; // Avoid zero as it is falsey (array will be sparse anyway)
    bindings[bindingId] = keypath; // This works beautifully
    let binding = {
      object: object,
      property: property,
    };
    if (!bindingsByKeypath[keypath]) {
      bindingsByKeypath[keypath] = [];
    }
    bindingsByKeypath[keypath][bindingId] = binding;

    let currentValue = splitKeypath.reduce((prev, curr) => isHiveObject(prev) ?
      prev.get(curr) :
      undefined, hive);
    if (isHiveObject(currentValue)) {
      currentValue = undefined;
    }
    object[OOML_INSTANCE_PROPNAME_HANDLE_BINDING_CHANGE_EVENT_FROM_STORE](property, currentValue);

    return bindingId;
  };
  HiveProto.unbind = function (bindingId) {
    let bindings = this[OOML_HIVE_PROPNAME_BINDINGS];
    let bindingsByKeypath = this[OOML_HIVE_PROPNAME_BINDINGS_BY_KEYPATH];

    let bindingKeypath = bindings[bindingId];
    delete bindings[bindingId];
    delete bindingsByKeypath[bindingKeypath][bindingId];
  };
  HiveProto.publish = function (channel, data) {
    (this[OOML_HIVE_PROPNAME_SUBSCRIPTIONS][channel] || []).forEach(s => {
      // Prevent exceptions from preventing remaining subscribers from getting message
      // Also... async? (Although JS is single threaded)
      setTimeout(() => {
        s[OOML_HIVESUBSCRIBER_PROPNAME_RECEIVE](data);
      }, 0);
    });
  };
  HiveProto[OOML_HIVE_PROPNAME_SUBSCRIBE] = function (channel, subscriber) {
    if (!this[OOML_HIVE_PROPNAME_SUBSCRIPTIONS][channel]) {
      this[OOML_HIVE_PROPNAME_SUBSCRIPTIONS][channel] = [];
    }
    this[OOML_HIVE_PROPNAME_SUBSCRIPTIONS][channel].push(subscriber);
  };

  let hive = new Hive();

  // Encapsulate to ensure only one hive, as HiveSubscriber is hard-coded to this instance
  // You can't have more than one/dynamically created global store anyway
  return {
    hive: hive,
    HiveSubscriber: HiveSubscriber,
  };
})();
let hive = hiveSetup.hive;
let HiveSubscriber = hiveSetup.HiveSubscriber;
OOML.hive = hive;
OOML.HiveSubscriber = HiveSubscriber;
