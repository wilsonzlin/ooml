**Static classes** are classes that can only contain fields, initialisers, and nested classes.

They are primarily used for two purposes:

- To create utility classes, which are classes that contain convenient functions that only act on parameters and don't need state. A good example would be math functions available in almost all languages.

- To act as a namespace for its nested classes. Those classes would then have a prefix that prevents naming conflicts and provides useful grouping.

Static classes cannot have a parent, and cannot be used as a parent. They cannot be used as a type.

To create a static class:

<!-- start tabbed sections -->

# HTML

Use the `static` attribute:

```html
<template ooml="class" name="MyStaticClass" static>
</template>
```

<!-- end tabbed sections -->
