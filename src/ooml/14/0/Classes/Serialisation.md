Serialising an ooml instance or array is as simple as calling the `.toJSON` method on it.

A JSON-serialisable object will be built recursively, based on the properties of the instance:

- Transient properties will be ignored.
- Every other property's value will be retrieved, calling any `get` method as usual.
- If it's an instance of `ooml.Instance` or `ooml.Array`, it will be serialised using `toJSON`.
- If it is a string, boolean, number, or `null`, it will be used as is.
- Otherwise, the behaviour of `toJSON` is not defined.

If it's an array, each element will be serialised this way.

# Custom behaviour

To define what happens when an instance of some class is serialised, declare a [special method](#Special methods) on the class called `serialise`:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class=" name="InputControl">
  <p name="value" type="string">""</p>

  <m name="serialise">
    function () {
      return this.value;
    }
  </m>

  <input value="{{ this.value }}">
</template>
```

<!-- end tabbed sections -->

The method must return a number, boolean, string, or null value.

If a custom serialiser method is declared, a [custom deserialiser](#Deserialisation) field should be declared too.
