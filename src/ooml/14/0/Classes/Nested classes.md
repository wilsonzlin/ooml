**Nested classes** are simply classes that are declared inside another class. They can then be referred to from that class.

The class a nested class is in is called its container class.

Because a class's FQN depends on its container class, nested classes are useful for organising and grouping classes. See [Class references](#Class references) for more information.

<!-- start tabbed sections -->

# HTML

It's possible to declare a class within another class using the regular declaration syntax for a class:

```html
<template ooml="class" name="ContainerClass">
  <template ooml="class" name="NestedClass"></template>
</template>
```

<!-- end tabbed sections -->
