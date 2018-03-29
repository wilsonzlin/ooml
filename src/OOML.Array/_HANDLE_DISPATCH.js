OOMLArrayProto[OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH] = function (_, eventName, eventData) {
  if (!Utils.typeOf(eventName, TYPEOF_STRING)) {
    throw new TypeError(`Event name isn't a string`);
  }

  let oomlArray = this;

  eventName = eventName.toLocaleLowerCase();

  let prevented = false;
  let dispatchEventHandlers = oomlArray[OOML_ARRAY_PROPNAME_DISPATCH_HANDLERS];

  if (dispatchEventHandlers[eventName]) {
    dispatchEventHandlers[eventName].forEach(handler => {
      let eventObject = {
        preventDefault: () => {
          prevented = true;
        },
        data: eventData,
      };

      if (handler.call(oomlArray, eventObject) === false) {
        prevented = true;
      }
    });
  }

  if (!prevented) {
    let attachedToInstance = oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_INSTANCE];
    let attachedToProperty = oomlArray[OOML_ARRAY_PROPNAME_ATTACHMENT_PARENT_PROPERTY];
    attachedToInstance[OOML_INSTANCE_PROPNAME_HANDLE_DISPATCH](attachedToProperty, eventName, eventData);
  }
};
