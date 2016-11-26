OOML.init = function(settings) {
	var globals = settings.globals,
		rootElem = settings.rootElem || document.body;

	var classes = {},
		objects = {};

	$(rootElem).find('template[ooml-class]').each(function(classTemplateElem) {
		var $classTemplateElem = $(classTemplateElem);

		var className = $classTemplateElem.attr('ooml-class');

		var localPropertyNames = Object.create(null),
			globalPropertiesMap = Object.create(null);

		var toProcess = $classTemplateElem.import().get();

		// Only use the first element for the class's DOM
		while (!(toProcess[0] instanceof Element)) toProcess.shift();
		toProcess = toProcess.slice(0, 1);

		var rootElemOfClass = toProcess[0],
			current;

		$classTemplateElem.remove();

		while (current = toProcess.shift()) {
			if (current instanceof Element) {
				Utils.pushAll(toProcess, current.attributes, current.childNodes);
			} else if (current instanceof Attr || current instanceof Text) {
				var paramsData = Utils.splitStringByParamholders(current.textContent);
				current.__oomlFormatStr = paramsData.parts;
				current.__oomlParamMap = paramsData.map;

				Object.keys(paramsData.map).forEach(function(propName) { // Use Object.keys to avoid scope issues
					var propNameParts = propName.split('.');
					if (propNameParts[0] == 'this') {
						localPropertyNames[propNameParts[1]] = true;
					} else {
						console.log('detected global property usage', propName);
						var objectToWatch = globals[propNameParts.shift()],
							_,
							endPropertyName = propNameParts.pop();

						while (_ = propNameParts.shift()) {
							objectToWatch = objectToWatch[_];
						}

						console.log('going to set setter on', objectToWatch);

						var d = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName),
							globalPropertyValueHolder; // Needed otherwise property won't be set due to setter but no getter
						if (!d.set) {
							Object.defineProperty(objectToWatch, endPropertyName, {
								get: function() {
									return globalPropertyValueHolder;
								},
								set: function setter(newVal) {
									console.log('called setter on global object', objectToWatch);
									setter.__oomlListeners.forEach(function(listener) {
										listener.call(objectToWatch, propName, newVal);
									});
									globalPropertyValueHolder = newVal;
								}
							});
							d = Object.getOwnPropertyDescriptor(objectToWatch, endPropertyName);
							d.set.__oomlListeners = [];
						}
						d.set.__oomlListeners.push(function(fullPropName, newVal) {
							console.log('called listener on setter function on global object', fullPropName, newVal);
							globalPropertiesMap[fullPropName].forEach(function(nodeAndInstance) {
								var node = nodeAndInstance.node;

								var formatStr = node.__oomlFormatStr;
								node.__oomlParamMap[fullPropName].forEach(function(offset) {
									formatStr[offset] = newVal;
								});

								nodeAndInstance.instance.__oomlAddChanges(node);
							});
						});
					}
				});
			}
		}

		localPropertyNames = Object.freeze(Object.keys(localPropertyNames));

		classes[className] = function(args) {
			var instance = this;

			var nodesWithUnwrittenChanges = new Set(),
				writeChangesSetTimeout,
				writeChanges = function() {
					if (writeChangesSetTimeout) clearTimeout(writeChangesSetTimeout);
					writeChangesSetTimeout = setTimeout(function() {
						nodesWithUnwrittenChanges.forEach(function(node) {
							node.textContent = node.__oomlFormatStr.join('');
						});
					}, 50);
				};

			var localPropertiesMap = {};

			var instanceDom = Utils.cloneElemForInstantiation(rootElemOfClass),
				toProcess = [instanceDom],
				current;

			while (current = toProcess.shift()) {
				if (current instanceof Element) {
					Utils.pushAll(toProcess, current.attributes, current.childNodes);
				} else if (current instanceof Attr || current instanceof Text) {
					if (current.__oomlParamMap) {
						for (var propName in current.__oomlParamMap) {
							if (propName.indexOf('this.') === 0) {
								propName = propName.slice(5);
								if (!localPropertiesMap[propName]) {
									localPropertiesMap[propName] = [];
								}
								localPropertiesMap[propName].push(current);
							} else {
								if (!globalPropertiesMap[propName]) {
									globalPropertiesMap[propName] = [];
								}
								globalPropertiesMap[propName].push({
									node: current,
									instance: instance,
								});
							}
						}
					}
				}
			}

			var instancePropertyValues = {};

			var propertiesGetterSetterFuncs = {};

			localPropertyNames.forEach(function(prop) {
				propertiesGetterSetterFuncs[prop] = {
					get: function() {
						return instancePropertyValues[prop];
					},
					set: function(newVal) {
						localPropertiesMap[prop].forEach(function(node) {
							var formatStr = node.__oomlFormatStr;
							node.__oomlParamMap['this.' + prop].forEach(function(offset) {
								formatStr[offset] = newVal;
							});
							nodesWithUnwrittenChanges.add(node);
						});

						writeChanges();

						instancePropertyValues[prop] = newVal;
					},
					enumerable: true,
				};
			});

			Object.assign(propertiesGetterSetterFuncs, {
				__oomlProperties: {
					value: localPropertyNames,
				},
				__oomlAddChanges: {
					value: function(node) {
						nodesWithUnwrittenChanges.add(node);
						writeChanges();
					},
				},
				__oomlDomAppendTo: {
					value: function(appendTo) {
						$(instanceDom).appendTo(appendTo);
					},
				},
				__oomlDomInsertAfter: {
					value: function(insertAfter) {
						$(instanceDom).insertAfter(insertAfter);
					},
				},
			});

			Object.defineProperties(this, propertiesGetterSetterFuncs);
		};
		classes[className].prototype = OOML.Element.prototype;
	});

	$(rootElem).find('[ooml-instantiate]').each(function(instanceInstantiationElem) {
		var $instanceInstantiationElem = $(instanceInstantiationElem);

		var instDetails = $instanceInstantiationElem.attr('ooml-instantiate').split(' '),
			className = instDetails[0],
			instanceName = instDetails[1];

		var instance = new classes[className];

		instance.__oomlDomInsertAfter(instanceInstantiationElem);

		$instanceInstantiationElem.remove();

		objects[instanceName] = instance;
	});

	return {
		classes: classes,
		objects: objects,
	};
};