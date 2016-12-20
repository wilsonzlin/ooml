OOML.init = function(settings) {
	settings = settings || {};

	var globals = settings.globals,
		rootElem = settings.rootElem || document.body;

	var classes = Object.create(null),
		objects = Object.create(null);

	if (typeof rootElem == 'string') rootElem = document.querySelector(rootElem);

	Utils.DOM.find(rootElem, 'template[ooml-class]').forEach(function(classTemplateElem) {
        // Parse declaration
		var classDeclarationParts = classTemplateElem.getAttribute('ooml-class').split(' ');

		// Get new class name
		var CLASS_NAME = classDeclarationParts[0];
		if (classes[CLASS_NAME]) throw new SyntaxError('The class ' + CLASS_NAME + ' has already been initialised');

		// Get parent class
		var CLASS_PARENT_CLASS;
		if (classDeclarationParts[1] == 'extends') {
			var classExtends = classDeclarationParts[2];
            CLASS_PARENT_CLASS = classes[classExtends];
            if (!CLASS_PARENT_CLASS) {
                CLASS_PARENT_CLASS = globals;
                classExtends.split('.').every(function(part) {
                    CLASS_PARENT_CLASS = CLASS_PARENT_CLASS[part];
                    if (!CLASS_PARENT_CLASS) {
                        return false;
                    }
                });
                if (typeof CLASS_PARENT_CLASS != 'function') {
                    throw new SyntaxError('The class ' + classExtends + ' does not exist');
                }
            }
		} else {
			CLASS_PARENT_CLASS = OOML.Element;
		}


        // A set containing all the properties' names in this class
		var CLASS_PROPERTIES_NAMES = new Set();

        // An object mapping global properties' names to a set containing nodes that use them
        var GLOBAL_PROPERTIES_MAP = Object.create(null);

        /*
            CLASS_ARRAY_PROPERTIES_NAMES and CLASS_ELEM_PROPERTIES_NAMES are used:
                - to check for duplicates
                - conditionally create special setters for instance proerties
                - conditionally destruct element properties when destructing
        */
        var CLASS_ARRAY_PROPERTIES_NAMES = new Set();
        var CLASS_ELEM_PROPERTIES_NAMES = new Set();

        // An object mapping class attributes' names to their default value
        var CLASS_PREDEFINED_ATTRIBUTES_VALUES = Object.create(null);

        // An object mapping class properties' names to their default value
        var CLASS_PREDEFINED_PROPERTIES_VALUES = Object.create(null);

        // An object mapping class properties' names to their function
        var CLASS_PREDEFINED_METHODS_FUNCTIONS = Object.create(null);


        // Get all nodes in template to process
		var toProcess = Utils.merge(document.importNode(classTemplateElem.content, true).childNodes);

		// Process predefined attributes (attributes must be defined first)
        // Note: Don't need to remove ooml-attribute, ooml-property or ooml-method as parent template is removed after parsing
        while (toProcess.length && (toProcess[0].nodeName == 'OOML-ATTRIBUTE' || !(toProcess[0] instanceof Element))) {
            var node = toProcess.shift();
            if (node instanceof Element) {
                var attrName = node.getAttribute('name');
                var evalValue = Utils.getEvalValue(node.textContent);
                if (evalValue === undefined) {
                    throw new TypeError('Predefined attribute value for ' + propName + ' cannot be undefined');
                }

                CLASS_PREDEFINED_ATTRIBUTES_VALUES[attrName] = evalValue;
            }
        }

        // Process predefined properties (properties must be defined after attributes)
		while (toProcess.length && (toProcess[0].nodeName == 'OOML-PROPERTY' || !(toProcess[0] instanceof Element))) {
			var node = toProcess.shift();
			if (node instanceof Element) {
				var propName = node.getAttribute('name');
				var evalValue = Utils.getEvalValue(node.textContent);
				if (evalValue === undefined) {
				    throw new TypeError('Predefined property value for ' + propName + ' cannot be undefined');
                }

				CLASS_PREDEFINED_PROPERTIES_VALUES[propName] = evalValue;
				CLASS_PROPERTIES_NAMES.add(propName);
			}
		}
		// Process predefined properties (methods must be defined after properties)
		while (toProcess.length && (toProcess[0].nodeName == 'OOML-METHOD' || !(toProcess[0] instanceof Element))) {
			var node = toProcess.shift();
			if (node instanceof Element) {
				var propName = node.getAttribute('name');
				var evalValue = Utils.getEvalValue(node.textContent);
				if (typeof evalValue != 'function') {
				    throw new TypeError('Predefined method ' + propName + ' is not a function');
                }

				CLASS_PREDEFINED_METHODS_FUNCTIONS[propName] = evalValue;
			}
		}
		// Trim non-elements from the right
		while (toProcess[1] && !(toProcess[1] instanceof Element)) toProcess.pop();

		if (toProcess.length !== 1) throw new SyntaxError('The class ' + CLASS_NAME + ' is empty or contains more than one root element');
		toProcess = [toProcess[0]];

		var CLASS_ROOT_ELEM = toProcess[0];
        var current;

        // Remove template (class declaration) element
		classTemplateElem.parentNode.removeChild(classTemplateElem);

		while (current = toProcess.shift()) {
			if (current instanceof Element) {

				var attrs = Utils.merge(current.attributes); // To prevent indexes from changing when removing inline event handler attributes

				attrs.forEach(function(attr) {
					if (attr.name.indexOf('childon') === 0) {
						if (!current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS] = Object.create(null);
						current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][attr.name.slice(7)] = Function('$self', 'globals', 'dispatch', 'data', attr.nodeValue);
						current.removeAttributeNode(attr);
					} else if (attr.name.indexOf('on') === 0) {
						if (!current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS] = Object.create(null);
						current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][attr.name] = Function('$self', 'globals', 'dispatch', 'event', 'event.preventDefault();' + attr.nodeValue);
						current.removeAttributeNode(attr);
					} else {
						toProcess.push(attr);
					}
				});

				Utils.pushAll(toProcess, current.childNodes);
			} else if (current instanceof Attr || current instanceof Text) {

				var nodeValue = current.nodeValue;

				if (current instanceof Text &&
                    /^(\s*\{\s*(for [A-Za-z0-9._]+ of|[A-Za-z0-9._]+) this\.([A-Za-z0-9_]+)\s*\}\s*)+$/.test(nodeValue)
				) {

                    Utils.parseElemSubstitutionCode(nodeValue).forEach(function(metadata) {
						// Match element substitution
						var elemConstructorName = metadata.class;
						var propName = metadata.propName;
						var isArraySubstitution = metadata.isArray;

						// The property can be predefined but not already in use
                        // NOTE: It's not possible for more than one element substitution of the same property
						if (CLASS_PROPERTIES_NAMES.has(propName) && CLASS_PREDEFINED_PROPERTIES_VALUES[propName] === undefined) {
							throw new SyntaxError('The property ' + propName + ' is already defined');
						}
						CLASS_PROPERTIES_NAMES.add(propName);

						var elemConstructor =
                                elemConstructorName == 'HTMLElement' ? HTMLElement :
                                elemConstructorName == 'OOML.Element' ? OOML.Element :
                                elemConstructorName.indexOf('.') == -1 ? classes[elemConstructorName] :
                                (function() {
                                    var parts = elemConstructorName.split('.'),
                                        elemConstructor = globals,
                                        part;

                                    while (part = parts.shift()) {
                                        elemConstructor = elemConstructor[part];
                                    }

                                    return elemConstructor;
                                })();

						if (typeof elemConstructor != 'function') {
							throw new TypeError(elemConstructorName + ' is not a valid class');
						}

						if (isArraySubstitution) {
							CLASS_ARRAY_PROPERTIES_NAMES.add(propName);
						} else {
							CLASS_ELEM_PROPERTIES_NAMES.add(propName);
						}

                        if (!current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = [];
                        current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG].push({ elemConstructor: elemConstructor, propName: propName, isArray: isArraySubstitution });
					});

				} else if (nodeValue.indexOf('{{') > -1) {

					var paramsData = Utils.splitStringByParamholders(nodeValue);
					current[OOML_NODE_PROPNAME_TEXTFORMAT] = paramsData.parts;
					current[OOML_NODE_PROPNAME_FORMATPARAMMAP] = paramsData.map;

					var currentNodeValueNeedsUpdate = false;

					Object.keys(paramsData.map).forEach(function(fullPropName) { // Use Object.keys to avoid scope issues
						var propNameParts = fullPropName.split('.');
						if (propNameParts[0] == 'this') {
							CLASS_PROPERTIES_NAMES.add(propNameParts[1]);
						} else if (!GLOBAL_PROPERTIES_MAP[fullPropName]) {
							GLOBAL_PROPERTIES_MAP[fullPropName] = new Set();
							var objectToWatch = globals[propNameParts.shift()],
								_,
								endPropertyName = propNameParts.pop();

							while (_ = propNameParts.shift()) {
								objectToWatch = objectToWatch[_];
							}

							// Set the current node text to the current value of the global
							var currentValue = objectToWatch[endPropertyName];
							paramsData.map[fullPropName].forEach(function(offset) {
								current[OOML_NODE_PROPNAME_TEXTFORMAT][offset] = currentValue;
							});
							currentNodeValueNeedsUpdate = true;

							var descriptor = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName);
							if (!descriptor.set) {
								var globalPropertyValueHolder = objectToWatch[endPropertyName]; // Needed otherwise property won't be set due to setter but no getter
								Object.defineProperty(objectToWatch, endPropertyName, {
									get: function() {
										return globalPropertyValueHolder;
									},
									set: function setter(newVal) {
										setter[OOML_GLOBALS_PROPNAME_PROPSETTER_LISTENERS].forEach(function(listener) {
											listener.call(objectToWatch, fullPropName, newVal);
										});
										globalPropertyValueHolder = newVal;
									},
								});
								descriptor = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName); // Refresh to get newly set setter
								descriptor.set[OOML_GLOBALS_PROPNAME_PROPSETTER_LISTENERS] = [];
							}

							descriptor.set[OOML_GLOBALS_PROPNAME_PROPSETTER_LISTENERS].push(function(fullPropName, newVal) {

								GLOBAL_PROPERTIES_MAP[fullPropName].forEach(function(node) {

									var formatStr = node[OOML_NODE_PROPNAME_TEXTFORMAT];
									node[OOML_NODE_PROPNAME_FORMATPARAMMAP][fullPropName].forEach(function(offset) {
										formatStr[offset] = newVal;
									});

									OOMLNodesWithUnwrittenChanges.add(node);
								});

								OOMLWriteChanges();
							});
						}
					});

					if (currentNodeValueNeedsUpdate) {
						// Should be performant as this element is never actually rendered (so it's just setting a property)
						current.nodeValue = current[OOML_NODE_PROPNAME_TEXTFORMAT].join('');
					}
				}
			}
		}

		classes[CLASS_NAME] = function(initState) {
			var instance = this,
				instanceIsDestructed = false,
				instanceIsAttached = false;

			var localPropertiesMap = Object.create(null),
				localGlobalPropertiesMap = Object.create(null); // For destructuring; to remember what to remove from GLOBAL_PROPERTIES_MAP

			var instancePropertyValues = Object.create(null),
				instanceAttributes = new Proxy(Object.create(null), { // Use Proxy to keep types
						set: function(target, key, newValue) {
							instanceDom.dataset[key] = target[key] = newValue;
							return true;
						},
						deleteProperty: function(target, key) {
							delete instanceDom.dataset[key];
							delete target[key];
							return true;
						},
					}),
				instanceExposedDOMElems = Object.create(null); // { "key": HTMLElement }

			var instanceDom = Utils.cloneElemForInstantiation(CLASS_ROOT_ELEM),
				toProcess = [instanceDom],
				current,

				dispatchEventToParent = function(eventName, eventData) {
					if (instanceDom.parentNode && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED] && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName]) {
						instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName](eventData);
					}
				};

			while (current = toProcess.shift()) {
				if (current instanceof Element) {

					if (current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]) {
						Object.keys(current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS]).forEach(function(eventName) {
							// Event object will be provided when called by browser
							current[eventName] = current[OOML_NODE_PROPNAME_GENERICEVENTHANDLERS][eventName].bind(instance, current, globals, dispatchEventToParent);
						});
					}
					if (current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]) {
						Object.keys(current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS]).forEach(function(eventName) {
							// Event data will be provided when called by child OOML element
							if (!current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED]) current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED] = Object.create(null);
							current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName] = current[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS][eventName].bind(instance, current, globals, dispatchEventToParent);
						});
					}

					var exposeKey = current.getAttribute('ooml-expose');
					if (exposeKey) {
						if (instanceExposedDOMElems[exposeKey]) throw new SyntaxError('A DOM element is already exposed with the key ' + exposeKey);
						instanceExposedDOMElems[exposeKey] = current;
						current.removeAttribute('ooml-expose');
					}

					Utils.pushAll(toProcess, current.attributes, current.childNodes);

				} else if (current instanceof Attr || current instanceof Text) {

					if (current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) {

					    // Only on Text nodes
						current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG].forEach(function(config) {
							var commentNodeMarker = document.createComment('');
							current.parentNode.insertBefore(commentNodeMarker, current);
							if (config.isArray) {
                                instancePropertyValues[config.propName] = new OOML.Array(config.elemConstructor, commentNodeMarker);
                            } else {
                                localPropertiesMap[config.propName] = {
                                    elemConstructor: config.elemConstructor,
                                    insertAfter: commentNodeMarker
                                };
                            }
						});

						current.parentNode.removeChild(current);

					} else if (current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {

						for (var propName in current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
							if (propName.indexOf('this.') === 0) {
								propName = propName.slice(5);
								if (!localPropertiesMap[propName]) {
									localPropertiesMap[propName] = [];
								}
								localPropertiesMap[propName].push(current);
							} else {
								GLOBAL_PROPERTIES_MAP[propName].add(current);
								if (!localGlobalPropertiesMap[propName]) {
									localGlobalPropertiesMap[propName] = [];
								}
								localGlobalPropertiesMap[propName].push(current);
							}
						}
					}

				}
			}

			var currentlyAttachedTo; // For public method .detach only; is not used to actually detach, it is used to call the parent object's method of detachment

			var propertiesGetterSetterFuncs = {};
            propertiesGetterSetterFuncs.attributes = {
                set: function(newObj) {
                    Object.keys(instanceAttributes).forEach(function(key) {
                        delete instanceAttributes[key];
                    });
                    Object.assign(instanceAttributes, newObj);
                },
                get: function() { return instanceAttributes; },
            };
            propertiesGetterSetterFuncs.detach = {
                value: function() {
                    if (instanceIsDestructed) {
                        OOMLInstanceDestructedError();
                    }

                    if (!instanceIsAttached) {
                        throw new Error('This instance is not in use');
                    }

                    var parent = currentlyAttachedTo.parent;
                    if (parent instanceof OOML.Array) {
                        var indexOfThis = parent.indexOf(this);
                        if (indexOfThis < 0) throw new Error('This instance could not be found on its parent array');
                        // This will call __oomlDetach
                        parent.splice(indexOfThis, 1);
                    } else if (parent instanceof OOML.Element) {
                        // This will update property to null but not destruct existing element
                        parent[OOML_ELEMENT_PROPNAME_DETACHOWNELEMPROPELEM](currentlyAttachedTo.property);
                    } else {
                        throw new Error('Unrecognised parent');
                    }

                    return this;
                },
            };
            propertiesGetterSetterFuncs.destruct = {
                value: function() {
                    if (instanceIsAttached) {
                        throw new Error('This instance is still in use; detach it before destructing it');
                    }

                    this[OOML_ELEMENT_PROPNAME_DESTRUCT]();
                }
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DETACHOWNELEMPROPELEM] = {
                value: function(propName) {
                    if (!CLASS_ELEM_PROPERTIES_NAMES.has(propName) || !this[propName]) {
                        throw new Error('The property value for ' + propName + ' is not an element');
                    }
                    if (instanceIsDestructed) {
                        OOMLInstanceDestructedError();
                    }

                    // Don't go through setter, directly update the internal values object
                    instancePropertyValues[propName][OOML_ELEMENT_PROPNAME_DETACH]();
                    instancePropertyValues[propName] = null;
                }
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DOMELEM] = {
                value: instanceDom,
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_ATTACH] = {
                value: function(settings) {
                    if (instanceIsDestructed) {
                        OOMLInstanceDestructedError();
                    }

                    if (instanceIsAttached) {
                        throw new Error('This instance is already in use');
                    }

                    currentlyAttachedTo = {
                        parent: settings.parent,
                        property: settings.property,
                    };

                    if (settings.appendTo) {
                        settings.appendTo.appendChild(instanceDom);
                    } else if (settings.prependTo) {
                        settings.prependTo.insertBefore(instanceDom, settings.prependTo.childNodes[0] || null);
                    } else if (settings.insertBefore) {
                        settings.insertBefore.parentNode.insertBefore(instanceDom, settings.insertBefore);
                    } else if (settings.insertAfter) {
                        settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
                    }

                    instanceIsAttached = true;
                },
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DETACH] = {
                value: function() {
                    if (instanceIsDestructed) {
                        OOMLInstanceDestructedError();
                    }

                    if (!instanceIsAttached) {
                        throw new Error('This instance is not in use');
                    }

                    currentlyAttachedTo = undefined;

                    instanceDom.parentNode.removeChild(instanceDom);
                    instanceIsAttached = false;
                },
            };
            propertiesGetterSetterFuncs[OOML_ELEMENT_PROPNAME_DESTRUCT] = {
                value: function() {
                    if (instanceIsDestructed) {
                        throw new Error('Attempted to destruct already-destructed instance');
                    }

                    var thisInstance = this;

                    // Detach if not already detached
                    if (instanceIsAttached) {
                        thisInstance[OOML_ELEMENT_PROPNAME_DETACH]();
                    }

                    // Destruct any attached elements
                    CLASS_ELEM_PROPERTIES_NAMES.forEach(function(prop) {
                        thisInstance[prop] = undefined;
                    });
                    CLASS_ARRAY_PROPERTIES_NAMES.forEach(function(prop) {
                        thisInstance[prop] = [];
                    });

                    // Remove nodes from GLOBAL_PROPERTIES_MAP
                    for (var globalPropName in localGlobalPropertiesMap) {
                        localGlobalPropertiesMap[globalPropName].forEach(function(nodeToRemove) {
                            GLOBAL_PROPERTIES_MAP[globalPropName].delete(nodeToRemove);
                        });
                    }

                    instanceIsDestructed = true;
                },
            };

			CLASS_PROPERTIES_NAMES.forEach(function(prop) {

				var setter;

				if (CLASS_ARRAY_PROPERTIES_NAMES.has(prop)) {
					setter = function(newVal) {
						if (instanceIsDestructed) {
							OOMLInstanceDestructedError();
						}

						instancePropertyValues[prop].initialize(newVal);
					};
				} else if (CLASS_ELEM_PROPERTIES_NAMES.has(prop)) {
					setter = function(newVal) {
						if (instanceIsDestructed) {
							OOMLInstanceDestructedError();
						}

						var elemDetails = localPropertiesMap[prop];

						// Attach first to ensure that element is attachable
						if (newVal != undefined) {
							var newElem = Utils.constructElement(elemDetails.elemConstructor, newVal);
							newElem[OOML_ELEMENT_PROPNAME_ATTACH]({ insertAfter: elemDetails.insertAfter, parent: this, property: prop });
						}

						// Current element may not be OOML.Element and therefore may not need destructing
						if (instancePropertyValues[prop] instanceof OOML.Element) {
							instancePropertyValues[prop][OOML_ELEMENT_PROPNAME_DESTRUCT]();
						}

						instancePropertyValues[prop] = newElem;
					};
				} else {
					setter = function(newVal) {
						if (instanceIsDestructed) {
							OOMLInstanceDestructedError();
						}

						if (!Utils.isPrimitiveValue(newVal)) {
							throw new TypeError('Cannot set new property value; unrecognised type');
						}

						if (localPropertiesMap[prop]) { // Some properties are unused in the DOM (e.g. predefined properties)
							localPropertiesMap[prop].forEach(function(node) {
								var formatStr = node[OOML_NODE_PROPNAME_TEXTFORMAT];
								node[OOML_NODE_PROPNAME_FORMATPARAMMAP]['this.' + prop].forEach(function(offset) {
									formatStr[offset] = newVal;
								});
								OOMLNodesWithUnwrittenChanges.add(node);
							});

							OOMLWriteChanges();
						}

						instancePropertyValues[prop] = newVal;
					};
				}

				propertiesGetterSetterFuncs[prop] = {
					get: function() {
						return instancePropertyValues[prop];
					},
					set: setter,
					enumerable: true,
				};
			});

			// Expose DOM elements via prefixed property
			Object.keys(instanceExposedDOMElems).forEach(function(keyName) {
				propertiesGetterSetterFuncs['$' + keyName] = {
					value: instanceExposedDOMElems[keyName],
				};
			});

			// Apply getters and setters for local properties
			Object.defineProperties(this, propertiesGetterSetterFuncs);

			// Get all predefined attributes properties (including inherited ones)
			var ancestorClasses = [],
				currentProto = this.__proto__;
			while (currentProto !== OOML.Element.prototype) {
				ancestorClasses.push(currentProto.constructor);
				currentProto = currentProto.__proto__;
			}

			// Apply predefined attributes and properties, starting with most ancient
			ancestorClasses.reverse().forEach(function(ancestorClass) {
                for (var attrName in ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDATTRS]) {
                    instance.attributes[attrName] = ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDATTRS][attrName];
                }

				for (var propName in ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS]) {
					instance[propName] = ancestorClass[OOML_CLASS_PROPNAME_PREDEFINEDPROPS][propName];
				}
			});

			// Apply given object argument to this new instance's properties
			// NOTE: .assign is available at this point, as instances are constructed AFTER classes are initialised (including prototypes)
			if (initState) this.assign(initState);

			// Remove any remaining parameter handlebars
            CLASS_PROPERTIES_NAMES.forEach(function(propName) {
                if (Array.isArray(localPropertiesMap[propName])) { // Some properties are not in DOM (e.g. only predefined) or are not for text subtitution (e.g. Array or Element)
                    if (instance[propName] === undefined) {
                        localPropertiesMap[propName].forEach(function(node) {
                            OOMLNodesWithUnwrittenChanges.add(node);
                        });
                    }
                }
            });
            // Update nodes with parameter handlebars (so they can be removed)
            OOMLWriteChanges();
		};

		// Set properties for accessing properties' names and predefined properties' values
		classes[CLASS_NAME][OOML_CLASS_PROPNAME_PROPNAMES] = CLASS_PROPERTIES_NAMES;
		classes[CLASS_NAME][OOML_CLASS_PROPNAME_PREDEFINEDATTRS] = CLASS_PREDEFINED_ATTRIBUTES_VALUES;
		classes[CLASS_NAME][OOML_CLASS_PROPNAME_PREDEFINEDPROPS] = CLASS_PREDEFINED_PROPERTIES_VALUES;

		// Make class inherit from parent class
		classes[CLASS_NAME].prototype = Object.create(CLASS_PARENT_CLASS.prototype);
		classes[CLASS_NAME].prototype.constructor = classes[CLASS_NAME];

		// Set defined methods in class prototype
		for (var methodName in CLASS_PREDEFINED_METHODS_FUNCTIONS) {
			classes[CLASS_NAME].prototype[methodName] = CLASS_PREDEFINED_METHODS_FUNCTIONS[methodName];
		}
	});

	Utils.DOM.find(rootElem, '[ooml-instantiate]').forEach(function(instanceInstantiationElem) {

		var instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
			className    = instDetails[0],
			instanceName = instDetails[1];

		if (objects[instanceName]) throw new SyntaxError('An object already exists with the name ' + instanceName);

		var initState = Utils.getEvalValue(instanceInstantiationElem.textContent);

		var instance = new classes[className](initState);

		instance[OOML_ELEMENT_PROPNAME_ATTACH]({ insertAfter: instanceInstantiationElem });

		// Copy attributes on instantiation element to new instance's root element
		Utils.merge(instanceInstantiationElem.attributes).forEach(function(attr) {
			if (attr.name != 'ooml-instantiate') {
				instance[OOML_ELEMENT_PROPNAME_DOMELEM].setAttribute(attr.name, attr.value);
			}
		});

		// Remove after attaching constructed elem
		instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

		objects[instanceName] = instance;
	});

	return {
		classes: classes,
		objects: objects,
	};
};