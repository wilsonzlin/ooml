ooml properties emit special events that extend the functionality of properites. They can be handled using declared methods on the class. They can alter or even prevent the behaviour that caused the event, and allow additional side effects when fundamental operations occur.

There are three events:

- `get`: Emitted when a property is accessed. Can be handled to return a custom value.
- `set`: Emitted when a property is assigned to. Can be handled to change the new value, set custom HTML where the property is substituted in the DOM, or prevent the assignment.
- `change`: Emitted when a property's value has changed. The initial assignment of a property value, which always happens during construction of a new instance, also causes this event.

To set a handler for any event, set the appropriate attribute to the name of a method defined on the class:

```html
<ooml-method name="getProp1">
    function(property) {
        alert(`Getting ${ property }`);
    }
</ooml-method>

<ooml-method name="setProp1">
    function(property) {
        alert(`Setting ${ property }`);
    }
</ooml-method>

<ooml-method name="onChangeProp1">
    function(property) {
        alert(`The property ${ property } has changed`);
    }
</ooml-method>

<ooml-property name="prop1"
    get="this.getProp1"
    set="this.setProp1"
    change="this.onChangeProp1"
>null</ooml-property>
```
