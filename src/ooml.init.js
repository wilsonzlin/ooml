OOML.init = function(settings) {
	settings = settings || {};

	var globals = settings.globals,
		rootElem = settings.rootElem || document.body;

	var classes = Object.create(null),
		objects = Object.create(null);

	if (typeof rootElem == 'string') rootElem = document.querySelector(rootElem);

	Utils.DOM.find(rootElem, 'template[ooml-class]').forEach(function(classTemplateElem) {

		var className = classTemplateElem.getAttribute('ooml-class');
		if (classes[className]) throw new SyntaxError('The class ' + className + ' has already been initialised');

		var localPropertyNames = Object.create(null),
			globalPropertiesMap = Object.create(null),

			localArrayProperties = Object.create(null), // Used to check for duplicates as well as in setters in instance proerties
			localElemProperties = Object.create(null); // Used to check for duplicates as well as in setters in instance properties

		var toProcess = Utils.merge(document.importNode(classTemplateElem.content, true).childNodes);

		// Don't need to remove ooml-property or ooml-method as parent template is removed after parsing
		var predefinedProperties = Object.create(null);
		var predefinedMethods = Object.create(null);

		// Process predefined properties (properties must be defined first)
		while (toProcess.length && (toProcess[0].nodeName == 'OOML-PROPERTY' || !(toProcess[0] instanceof Element))) {
			var node = toProcess.shift();
			if (node instanceof Element) {
				var propName = node.getAttribute('name');
				var evalValue = Utils.getEvalValue(node.textContent);

				predefinedProperties[propName] = evalValue;
				localPropertyNames[propName] = true;
			}
		}
		// Process predefined properties (methods must be defined after properties)
		while (toProcess.length && (toProcess[0].nodeName == 'OOML-METHOD' || !(toProcess[0] instanceof Element))) {
			var node = toProcess.shift();
			if (node instanceof Element) {
				var propName = node.getAttribute('name');
				var evalValue = Utils.getEvalValue(node.textContent);

				predefinedMethods[propName] = evalValue;
			}
		}
		// Trim non-elements from the right
		while (toProcess[1] && !(toProcess[1] instanceof Element)) toProcess.pop();

		if (toProcess.length !== 1) throw new SyntaxError('The class ' + className + ' is empty or contains more than one root element');
		toProcess = [toProcess[0]];

		var rootElemOfClass = toProcess[0],
			current;

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

				var nodeValue = current.nodeValue,
					regexpMatches,
					elemConstructorName,
					elemConstructor,
					isArraySubstitution,
					propName;

				if (current instanceof Text &&
					((regexpMatches = /\s*\{\s*for ([A-Za-z0-9._]+) of this\.([A-Za-z0-9_]+)\s*(\})\s*/.exec(nodeValue)) ||
					(regexpMatches = /\s*\{\s*([A-Za-z0-9._]+) this\.([A-Za-z0-9_]+)\s*\}\s*/.exec(nodeValue)))
				) {

					// Match element substitution
					elemConstructorName = regexpMatches[1];
					propName = regexpMatches[2];
					isArraySubstitution = !!regexpMatches[3];

					// Don't allow multiple element substitution of the same property, but allow that property to be predefined
					if (localPropertyNames[propName] && !predefinedProperties[propName]) {
						throw new SyntaxError('The property ' + propName + ' is already defined');
					}

					localPropertyNames[propName] = true;
					elemConstructor =
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
						localArrayProperties[propName] = true;
						current.parentNode[OOML_NODE_PROPNAME_ELEMUNPACKINGCONFIG] = { elemConstructor: elemConstructor, propName: propName };
						current.parentNode.removeChild(current);
					} else {
						localElemProperties[propName] = true;
						current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG] = { elemConstructor: elemConstructor, propName: propName };
					}


				} else if (nodeValue.indexOf('{{') > -1) {

					var paramsData = Utils.splitStringByParamholders(nodeValue);
					current[OOML_NODE_PROPNAME_TEXTFORMAT] = paramsData.parts;
					current[OOML_NODE_PROPNAME_FORMATPARAMMAP] = paramsData.map;

					var currentNodeValueNeedsUpdate = false;

					Object.keys(paramsData.map).forEach(function(fullPropName) { // Use Object.keys to avoid scope issues
						var propNameParts = fullPropName.split('.');
						if (propNameParts[0] == 'this') {
							localPropertyNames[propNameParts[1]] = true;
						} else if (!globalPropertiesMap[fullPropName]) {
							globalPropertiesMap[fullPropName] = new Set();
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

							var d = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName);
							if (!d.set) {
								var globalPropertyValueHolder = objectToWatch[endPropertyName]; // Needed otherwise property won't be set due to setter but no getter
								Object.defineProperty(objectToWatch, endPropertyName, {
									get: function() {
										return globalPropertyValueHolder;
									},
									set: function setter(newVal) {
										setter.__oomlListeners.forEach(function(listener) {
											listener.call(objectToWatch, fullPropName, newVal);
										});
										globalPropertyValueHolder = newVal;
									},
								});
								d = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName); // Refresh to get newly set setter
								d.set.__oomlListeners = [];
							}

							d.set.__oomlListeners.push(function(fullPropName, newVal) {

								globalPropertiesMap[fullPropName].forEach(function(node) {

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

		// Don't Object.freeze this as it's unnecessary
		localPropertyNames = Object.keys(localPropertyNames);

		classes[className] = function(initState) {
			var instance = this,
				instanceIsDestructed = false,
				instanceIsAttached = false;

			var localPropertiesMap = Object.create(null),
				localGlobalPropertiesMap = Object.create(null); // For destructuring; to remember what to remove from globalPropertiesMap

			var instancePropertyValues = Object.create(null),
				instanceAttributes = new Proxy(Object.create(null), { // OOML instance attributes, not HTML/DOM attributes; use Proxy to keep types
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

			var instanceDom = Utils.cloneElemForInstantiation(rootElemOfClass),
				toProcess = [instanceDom],
				current,

				dispatchEventToParent = function(eventName, eventData) {
					if (instanceDom.parentNode && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED] && instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName]) {
						instanceDom.parentNode[OOML_NODE_PROPNAME_CHILDEVENTHANDLERS_BINDED][eventName](eventData);
					}
				};

			while (current = toProcess.shift()) {
				if (current instanceof Element) {

					if (current[OOML_NODE_PROPNAME_ELEMUNPACKINGCONFIG]) {
						var config = current[OOML_NODE_PROPNAME_ELEMUNPACKINGCONFIG];
						instancePropertyValues[config.propName] = new OOML.Array(config.elemConstructor, current);
					}

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
					if (current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG]) { // Only on Text nodes
						var config = current[OOML_NODE_PROPNAME_ELEMSUBSTITUTIONCONFIG];
						var commentNodeMarker = document.createComment('');
						current.parentNode.insertBefore(commentNodeMarker, current);
						current.parentNode.removeChild(current);
						localPropertiesMap[config.propName] = { elemConstructor: config.elemConstructor, insertAfter: commentNodeMarker };
					} else if (current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
						for (var propName in current[OOML_NODE_PROPNAME_FORMATPARAMMAP]) {
							if (propName.indexOf('this.') === 0) {
								propName = propName.slice(5);
								if (!localPropertiesMap[propName]) {
									localPropertiesMap[propName] = [];
								}
								localPropertiesMap[propName].push(current);
							} else {
								globalPropertiesMap[propName].add(current);
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

			var propertiesGetterSetterFuncs = {
				attributes: {
					set: function(newObj) {
						Object.keys(instanceAttributes).forEach(function(key) {
							delete instanceAttributes[key];
						});
						Object.assign(instanceAttributes, newObj);
					},
					get: function() { return instanceAttributes; },
				},
				detach: {
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
							parent.splice(indexOfThis, 1); // This will call __oomlDetach
						} else if (parent instanceof OOML.Element) {
							parent[currentlyAttachedTo.property] = null; // This will call __oomlDetach
						} else {
							throw new Error('Unrecognised parent');
						}
					},
				},
				dispatch: {
					value: dispatchEventToParent,
				},
				__oomlDomElem: {
					value: instanceDom,
				},
				__oomlAttach: {
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
						} else if (settings.insertAfter) {
							settings.insertAfter.parentNode.insertBefore(instanceDom, settings.insertAfter.nextSibling);
						}

						instanceIsAttached = true;
					},
				},
				__oomlDetach: {
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
				},
				__oomlDestruct: {
					value: function() {
						if (instanceIsDestructed) {
							throw new Error('Attempted to destruct already-destructed instance');
						}

						var thisInstance = this;

						// Detach if not already detached
						if (instanceIsAttached) {
							thisInstance.__oomlDetach();
						}

						// Reject getting and setting local properties
						localPropertyNames.forEach(function(prop) {
							Object.defineProperty(thisInstance, prop, {
								get: OOMLInstanceDestructedError,
								set: OOMLInstanceDestructedError,
							});
						});

						// Remove nodes from globalPropertiesMap
						for (var globalPropName in localGlobalPropertiesMap) {
							localGlobalPropertiesMap[globalPropName].forEach(function(nodeToRemove) {
								globalPropertiesMap[globalPropName].delete(nodeToRemove);
							});
						}

						instanceIsDestructed = true;
					},
				},
			};

			localPropertyNames.forEach(function(prop) {

				var setter;

				if (localArrayProperties[prop]) {
					setter = function(newVal) {
						instancePropertyValues[prop].initialize(newVal);
					};
				} else if (localElemProperties[prop]) {
					setter = function(newVal) {
						var elemDetails = localPropertiesMap[prop];

						// Attach first to ensure that element is attachable
						if (newVal != undefined) {
							var newElem = Utils.constructElement(elemDetails.elemConstructor, newVal);
							newElem.__oomlAttach({ insertAfter: elemDetails.insertAfter, parent: this, property: prop });
						}

						// Current element may not be OOML.Element and therefore may not need destructing
						if (instancePropertyValues[prop] instanceof OOML.Element) {
							instancePropertyValues[prop].__oomlDestruct();
						}

						instancePropertyValues[prop] = newElem;
					};
				} else {
					setter = function(newVal) {
						if (!Utils.isPrimitiveValue(newVal)) {
							newVal = '' + newVal;
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
					configurable: true, // For updating get/set on destruct
				};
			});

			Object.keys(instanceExposedDOMElems).forEach(function(keyName) {
				propertiesGetterSetterFuncs['$' + keyName] = {
					value: instanceExposedDOMElems[keyName],
				};
			});

			Object.defineProperties(this, propertiesGetterSetterFuncs);

			for (var propName in predefinedProperties) {
				instance[propName] = predefinedProperties[propName];
			}
			// This works, as instances are constructed AFTER classes are initialised (including prototypes)
			if (initState) this.assign(initState);
		};
		classes[className].__oomlProperties = localPropertyNames;
		classes[className].prototype = Object.create(OOML.Element.prototype);
		classes[className].prototype.constructor = classes[className];
		for (var methodName in predefinedMethods) {
			classes[className].prototype[methodName] = predefinedMethods[methodName];
		}
	});

	Utils.DOM.find(rootElem, '[ooml-instantiate]').forEach(function(instanceInstantiationElem) {

		var instDetails  = instanceInstantiationElem.getAttribute('ooml-instantiate').split(' '),
			className    = instDetails[0],
			instanceName = instDetails[1];

		if (objects[instanceName]) throw new SyntaxError('An object already exists with the name ' + instanceName);

		var initState = Utils.getEvalValue(instanceInstantiationElem.textContent);

		var instance = new classes[className](initState);

		instance.__oomlAttach({ insertAfter: instanceInstantiationElem });

		// Remove after attaching constructed elem
		instanceInstantiationElem.parentNode.removeChild(instanceInstantiationElem);

		objects[instanceName] = instance;
	});

	return {
		classes: classes,
		objects: objects,
	};
};