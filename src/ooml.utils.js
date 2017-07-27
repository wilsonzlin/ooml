let Utils = {
    getClassFromString: (imports, classes, className) => {
        if (classes[className]) {
            return classes[className];
        }

        let ret = imports[className];

        if (!Utils.isOOMLClass(ret)) {
            throw new ReferenceError(`The class "${ className }" does not exist`);
        }

        return ret;
    },

    typeOf: (value, type) => {
        return typeof value == type;
    },

    iterate: (iterable, iterator) => {
        for (let i = 0; i < iterable.length; i++) {
            iterator(iterable[i], i, iterable);
        }
    },

    // Works on objects with null prototype too
    hasOwnProperty: (obj, propName) => !!obj && Utils.typeOf(obj, TYPEOF_OBJECT) && Object.prototype.hasOwnProperty.call(obj, propName),

    parseTypeDeclaration: types => types.split('|').filter((type, idx, types) => {
        if (OOMLPropertyTypes.indexOf(type) == -1) {
            throw new SyntaxError(`Invalid type declaration "${ type }"`);
        }
        if (types.indexOf(type) !== idx) {
            throw new SyntaxError(`Duplicate type "${ type }" in type declaration`);
        }

        // There can only be one number type
        // If current type is a number type and there exists another number type...
        if (OOMLPropertyNumberTypes.indexOf(type) > -1 && types.some((t, i) => i != idx && OOMLPropertyNumberTypes.indexOf(t) > -1)) {
            throw new SyntaxError(`Illegal type declaration "${ type }"`);
        }
        return true;
    }),

    deepFreeze: obj => {
        Object.freeze(obj);
        Object.keys(obj).forEach(key => {
            let val = obj[key];
            if (Utils.isObjectLiteral(val) || Array.isArray(val)) {
                Utils.deepFreeze(val);
            }
        });
        return obj;
    },

    isNotOrBlankString: str => !Utils.typeOf(str, TYPEOF_STRING) || !str.trim(),

    parseBindingDeclaration: declaration => {
        let posOfLeftBrace;
        let toProcess = declaration;
        let dynamicParts = [];
        let localPropertyToPartMap = Utils.createCleanObject();
        while ((posOfLeftBrace = toProcess.indexOf('{')) > -1) {
            let upToBrace = toProcess.slice(0, posOfLeftBrace);
            dynamicParts.push(upToBrace);

            toProcess = toProcess.slice(posOfLeftBrace);
            let posOfRightBrace = toProcess.indexOf('}');
            if (posOfRightBrace == -1) {
                throw new SyntaxError(`Malformed binding syntax: "${ declaration }"`);
            }
            // param === "{{ some.param }}"
            let param = toProcess.slice(0, posOfRightBrace + 2);
            let matches;
            if (!(matches = /^{{ this\.([a-zA-Z0-9_]+) }}$/.exec(param))) {
                throw new SyntaxError(`Malformed binding syntax: "${ declaration }"`);
            }
            let localProperty = matches[1];
            let partId = dynamicParts.push("") - 1;
            if (!localPropertyToPartMap[localProperty]) {
                localPropertyToPartMap[localProperty] = [];
            }
            localPropertyToPartMap[localProperty].push(partId);

            toProcess = toProcess.slice(posOfRightBrace + 2);
        }
        if (toProcess.length) {
            dynamicParts.push(toProcess);
        }

        let isDynamic = dynamicParts.length > 1;
        if (isDynamic) {
            return {
                isDynamic: true,
                parts: dynamicParts,
                propertyToPartMap: localPropertyToPartMap,
            };
        } else {
            return {
                isDynamic: false,
                keypath: dynamicParts[0],
            };
        }
    },

    // Because many people will model the UI around their data,
    // the data may not confirm to our preferred camelCase property
    // name format, so don't require it
    isValidPropertyName: name =>
        Utils.typeOf(name, TYPEOF_STRING) &&
        !!name.length &&
        name[0] != '$' &&
        // Double underscore prefix
        !(name[0] == '_' && name[1] == '_') &&
        // Starting or trailing whitespace
        !/^\s|\s$/.test(name) &&
        OOMLReservedPropertyNames.indexOf(name) == -1,

    // ${str} is always a non-empty string
    toDashCase: str => dashCaseCache[str] || (dashCaseCache[str] = str.replace(/^[a-z]+|(?!^)(?:[A-Z][a-z]*)/g, match => match.toLowerCase() + '-').slice(0, -1)),

    // Must be used only with strings (usually .textContent)
    getEvalValue: codeStr => Function(`"use strict";return ${ codeStr.trim() || undefined }`)(),

    getDefaultPrimitiveValueForTypes: types => {
        if (!types || ~types.indexOf('null')) {
            return null;
        } else if (~types.indexOf('natural') || ~types.indexOf('integer') || ~types.indexOf('float') || ~types.indexOf('number')) {
            return 0;
        } else if (~types.indexOf('boolean')) {
            return false;
        } else if (~types.indexOf('string')) {
            return '';
        } else {
            throw new Error(`Unknown type "${types}"`);
        }
    },

    deepClone: obj => {
        let cloned;
        if (Utils.isObjectLiteral(obj)) {
            cloned = Utils.createCleanObject();
            Object.keys(obj).forEach(key => {
                cloned[key] = Utils.deepClone(obj[key]);
            });
        } else if (Array.isArray(obj)) {
            cloned = obj.map(item => Utils.deepClone(item));
        } else {
            cloned = obj;
        }
        return cloned;
    },

    // Use full function declaration for "arguments" object
    concat: function() {
        let ret;

        if (Utils.isObjectLiteral(arguments[0])) {
            ret = Utils.createCleanObject();
            for (let i = 0; i < arguments.length; i++) {
                let obj = arguments[i];
                if (Utils.isObjectLiteral(obj)) {
                    Object.keys(obj).forEach(function(prop) {
                        ret[prop] = obj[prop];
                    });
                }
            }
        } else {
            // WARNING: Don't use .concat as that doesn't work with array-like objects
            // e.g. [].concat(NodeList(div, span)) becomes [NodeList], not [div, span]
            ret = Array.prototype.slice.call(arguments[0]);
            for (let i = 1; i < arguments.length; i++) {
                if (arguments[i] && arguments[i].length) {
                    Array.prototype.push.apply(ret, arguments[i]);
                }
            }
        }
        return ret;
    },

    isOOMLClass: c => Utils.typeOf(c, TYPEOF_FUNCTION) && c.prototype instanceof OOML.Element,

    isPrimitiveValue: val => Utils.isType(OOMLPrimitiveTypes, val),

    // typeof null == 'object'
    // Use typeof as .getPrototypeOf can't be used with non-objects
    // Object.create(null) is NOT instanceof Object, so don't use instanceof
    isObjectLiteral: (obj) => !!obj && Utils.typeOf(obj, TYPEOF_OBJECT) && (obj.constructor == Object || Object.getPrototypeOf(obj) === null),

    isType: (type, value) => {
        if (Array.isArray(type)) {
            return type.some(t => Utils.isType(t, value));
        }
        switch (type) {
            case 'null':
                return value === null;

            case 'number':
            case 'boolean':
            case 'string':
            case 'function':
                return typeof value == type;

            case 'natural':
            case 'integer':
                return Utils.typeOf(value, TYPEOF_NUMBER) &&
                    isFinite(value) &&
                    Math.floor(value) === value &&
                    (type != 'natural' || value >= 0);

            case 'float':
                // Floats can have zero remainder, as there is no real difference between int and float in JS
                return Utils.typeOf(value, TYPEOF_NUMBER) &&
                    isFinite(value); // Returns false on NaN and +/-Infinity

            case 'Object':
                return Utils.isObjectLiteral(value);

            case 'Array':
                return Array.isArray(value);

            default:
                throw new Error(`Unrecognised type for checking against`);
        }
    },

    createCleanObject: () => Object.create(null),

    constructElement: (elemConstructor, obj) => {
        if (obj instanceof elemConstructor) {
            return obj;
        }

        // Don't check obj's type or if elemConstructor is OOML.Element; this will be handled by the constructor
        return new elemConstructor(obj);
    },
};
