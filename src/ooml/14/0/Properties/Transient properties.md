ooml instances can be used in many different ways for different purposes, but most of the time, they are used to hold data and have a view that represents that data. This is done by accessing and assigning values to properties on the instance. However, sometimes values need to be stored on an instance that is not data but is related to its state. Some examples are:

- Holding a JavaScript instance object of a graph when using a non-ooml graph library to show a graph in the view of a class.
- Allowing easy configuration of the view's styling through the use of assignable properties.
- Having placeholder properties that allow references to external things to be placed (e.g. callbacks).

These are what **transient** properties are for.

Transient properties can be declared by adding the `transient` boolean attribute to the `ooml-property` tag:

```html
<ooml-property name="transientProperty" transient>null</ooml-property>
```

If a property is declared transient:

- It will not be included in the serialised JSON when `.toJSON` is called, even if the instance that `.toJSON` is called on is not the instance this property is on.
- It cannot have a type declaration; it will accept any value that is not `undefined`.
- It still needs a default value that cannot be `undefined`.
