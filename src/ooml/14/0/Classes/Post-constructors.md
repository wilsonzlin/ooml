Post-constructors are special methods that are called automatically at the end of creating a new instance. They can be declared like so:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class" name="A">
  <m name="postConstructor">
    function () {
      console.log("Hello from A");
    }
  </m>
</template>
```

# Python

```python
from ooml.oomllib.python.ail import Instance

class A(Instance):
  def postConstructor(self):
    print("Hello from A")
```

<!-- end tabbed sections -->

It is not allowed to return anything.

The `this`/`self` special variable is available inside the post-constructor, and refers to the newly-instantiated ooml instance. It has all declared and inherited properties and methods, and all properties have their values set to [default](#Default property values) or [initial state](#Initial state) values.
