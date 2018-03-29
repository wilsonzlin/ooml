OOMLInstanceProto.dispatch = function (eventName, eventData) {

  if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
    throw new TypeError(`Event name isn't a string`);
  }

  let instance = this;

  let prevented = false;
  eventName = eventName.toLocaleLowerCase();

  let instanceEventHandlers = instance[OOML_INSTANCE_PROPNAME_EVENT_HANDLERS_DISPATCH];
  let instanceIsAttachedTo = instance[OOML_INSTANCE_PROPNAME_CURRENT_ATTACHMENT];

  if (instanceEventHandlers[eventName]) {
    instanceEventHandlers[eventName].forEach(handler => {
      let eventObject = {
        preventDefault: () => {
          prevented = true;
        },
        data: eventData,
      };

      let returnValue = handler.call(instance, eventObject);

      if (returnValue === false) {
        prevented = true;
      }
    });
  }

  if (!prevented && instanceIsAttachedTo.parent) {
    instanceIsAttachedTo.parent[OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH](instanceIsAttachedTo.property, eventName, eventData);
  }

};
