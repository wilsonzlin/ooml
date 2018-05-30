Constructors are special functions that are called when instantiating a class.

They can be declared like so:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class" name="A">
  <m name="constructor">
    function () {
      console.log("Hello from A");
    }
  </m>
</template>
```

# Python

```python
class A:
  def __init__(self):
    print("Hello from A")
```

<!-- end tabbed sections -->

It is not allowed to return anything.

The `this`/`self` special variable is available inside the post-constructor, and refers to the newly-instantiated ooml instance. It has all declared and inherited properties and methods, and all properties have their values set to [default](#Default property values) or [initial state](#Initial state) values.
