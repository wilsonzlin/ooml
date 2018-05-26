Communication between an instance and the instance it's [attached](#Instance attachment) to can be done using **dispatch events**. When an instance is attached, it is referred to as the *child instance*, and the instance it's attached to as the *parent instance*.

While not the only way to do parent-child communication, it is the preferred way. Every instance has a `.dispatch` method, inherited from the base class `OOML.Instance`. Calling this method will notify the parent that an event has occurred on the child instance:

```html
<template ooml-class="ChildClass">
  <ooml-method name="dispatchHelloToParent">
    function() {
      // "hello" is the event name
      this.dispatch("hello");
    }
  </ooml-method>
</template>
```

To handle events dispatched from an attached child instance, declare a `handle-*` attribute on the `ooml-property` tag, and set the value to the name of a method available in the same class:

```html
<template ooml-class="ParentClass">
  <ooml-property name="childInstance" type="ChildClass" handle-hello="this.handleHelloFromChild">{}</ooml-property>

  <ooml-method name="handleHelloFromChild">
    function(event) {
      console.log(`Received a ${ event.name } event from childInstance`);
    }
  </ooml-method>
</template>
```

If an instance is attached to an ooml array, the array will pass the event through to the instance it's attached to:

```html
<template ooml-class="ParentClass">
  <ooml-property name="childInstances" type="ChildClass" handle-hello="this.handleHelloFromSomeChild" array>[]</ooml-property>

  <ooml-method name="handleHelloFromSomeChild">
    function(event) {
      console.log(`Received ${ event.name } event from a child instance in the array childInstances`);
    }
  </ooml-method>
</template>
```

However, this may make it difficult to identify which specific instance it came from, as it appears to have come from the array. In general, if additional information needs to be passed along with the event, such as providing the context/reason of the event, or data/state relating to it, provide it as the second argument to the `.dispatch` method:

```html
<template ooml-class="ChildClass">
  <ooml-property name="name" type="string">"Albert Einstein"</ooml-property>

  <ooml-method name="dispatchHelloToParent">
    function() {
      this.dispatch("hello", { from: this.name });
    }
  </ooml-method>
</template>
```

Whatever is passed in as the second argument will be provided as the value of the property `data` in the `event` object passed to the handler as the first argument:

```html
<template ooml-class="ParentClass">
  <ooml-property name="childInstances" type="ChildClass" handle-hello="this.handleHelloFromSomeChild" array>[]</ooml-property>

  <ooml-method name="handleHelloFromSomeChild">
    function(event) {
      console.log(`
          Received a ${ event.name } event a child instance.
          That child's name? ${ event.data.from }.
      `);
    }
  </ooml-method>
</template>
```

Note that there is no requirement to handle any events, and declaring `handle-*` attributes for events that are never dispatched (i.e. do not exist) is not an error.

The value for all `handle-*` attributes must point to methods that exist, either through declaration or inheritance.

Also note that unlike DOM events, ooml events do not [propagate](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow).
