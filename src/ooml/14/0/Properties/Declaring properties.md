**Properties** store the state of an instance. They are like properties in JavaScript: they are values on an object, and can be accessed and assigned to using the notation `obj.prop` or `obj["prop"]`. ooml introduces more safety when dealing with properties by:

- Requiring properties to be declared, with an initial value, before they can be used.
- Allowing type declarations to ensure type safety at runtime.
- Preventing the assignment of properties that have not been declared.

To declare a property called "myProp" for a class, use an `ooml-property` tag:

```html
<template ooml-class="MyClass">
  <ooml-property name="myProp">null</ooml-property>
</template>
```

The name of the property is declared using the `name` attribute. It is recommended to use [camelCase](https://en.wikipedia.org/wiki/Camel_case) when naming properties. There are restrictions on names for properties and other identifiers — see [Identifiers](#Identifiers) for more details.
