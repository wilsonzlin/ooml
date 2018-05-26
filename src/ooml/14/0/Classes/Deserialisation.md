[Serialised](#Serialisation) instances and arrays need to be deserialised using a JSON parser before they can be used. [JSON.stringify](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) is a built-in JSON parser available to most browsers.

# Custom behaviour

If a class has a custom [serialiser](#Serialisation), it will probably need a custom deserialiser. Because custom-serialised values can only be primitive, any custom deserialiser is only called when the [initial state](#Initial state) is a primitive value.

A custom deserialiser is declared as a [special field](#Special fields) on the class called `deserialise`:

```html
<template ooml-class="InputControl">
  <ooml-property name="value" type="string">""</ooml-property>

  <ooml-field name="deserialise">
    function (initState) {
      return {
        value: initState,
      };
    }
  </ooml-field>

  <input value="{{ this.value }}">
</template>
```

The method must return an object literal.
