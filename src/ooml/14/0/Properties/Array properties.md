ooml properties can be arrays, which allows the property to hold a list of values instead of just one. The property's type must be a class type, which means that array properties can only hold instances, not primitive values.

Array properties can be substituted into the view. When they are, each instance is placed into the view at the position of the substitution, in order.

The property value of an array substitution is an instance of the `OOML.Array` JavaScript (not ooml) class. It is designed to be very similar to a JavaScript array, and for most purposes it's fine to treat an OOML.Array like an [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), **but they are not the same**. For more details, see [OOML.Array](#OOML.Array).

To make a property an array property, add the `array` boolean attribute to the `ooml-property` tag:

```html
<template ooml-class="Item">
    <ooml-property name="name" type="string">""</ooml-property>
</template>

<template ooml-class="List">
    <ooml-property array name="items" type="Item">[]</ooml-property>
</template>
```
