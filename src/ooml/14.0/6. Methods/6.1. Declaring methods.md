To declare a **method** called "myMethod" for a class, use an `ooml-method` tag:

```html
<template ooml-class="MyClass">
    <ooml-method name="myMethod">
        function() {
            console.log('Hello world!');
        }
    </ooml-property>
</template>
```

The name of the method is declared using the `name` attribute. It is recommended to use camelCase when naming methods. There are restrictions on names for methods and other identifiers — see [Identifiers](#Identifiers) for more details.

Inside the `ooml-method` tag, an anonymous JavaScript function should be declared to describe the method. The function describes the parameters and body code, but not the name of the method. It must be a standard function, not an arrow or generator function.
