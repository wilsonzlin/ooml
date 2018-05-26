To refer to other classes, use the regular way for doing so in the language. Usually, this involves importing the class or containing namespace to get a local reference to the class.

For HTML code, there is a special syntax for referring to other classes declaratively. There is also a way to refer to ther classes inside functions imperiatively.

<!-- start tabbed sections -->

# HTML

## Declarative

A common use of referring to other classes is for inheritance.

In these examples, the target class is `A.B.C.D.Exciting`, and the class doing the referring is `A.B.C.D.Eggplant`.

An absolute reference can be used. This requires the entire reference to be written.

```html
<template ooml="class" name="Eggplant" parent="A.B.C.D.Exciting"></template>
```

If the target is in the same module, the module part can be replaced with a caret (`^`):

```html
<template ooml="class" name="Eggplant" parent="^B.C.D.Exciting"></template>
```

Additionally, the reference can be relative to the current namespace, by adding a dot (`.`) for each containing namespace to start from:

```html
<template ooml="class" name="Eggplant" parent=".Exciting"></template>
```

Continuing the depth is possible. This refers to `A.B.C.D.E.Fantastic`:

```html
<template ooml="class" name="Eggplant" parent=".E.Fantastic"></template>
```

Add a dot for each level higher. This refers to `A.B.C.Door`:

```html
<template ooml="class" name="Eggplant" parent="..Door"></template>
```

Add a dot for each level higher. This refers to `A.B.Cool`:

```html
<template ooml="class" name="Eggplant" parent="...Cool"></template>
```

The following refers to `A.Blue`. Probably better just to use the module-relative syntax.

```html
<template ooml="class" name="Eggplant" parent="....Blue"></template>
<!-- Same as above, but easier to understand -->
<template ooml="class" name="Eggplant" parent="^Blue"></template>
```

Don't go higher than the module. This is **not** allowed:

```html
<!-- Invalid parent reference -->
<template ooml="class" name="Eggplant" parent=".....Xero"></template>
```

## Imperiative

To use another class inside a function, use the `m` variable:

```html
<template ooml="class" name="Eggplant">
  <m name="method">
    function () {
      return new m.A.B.C.D.Exciting();
    }
  </m>
</template>
```

`m` is not a global variable. It is provided in an invisible scope outside the function, which can't be controlled by the function.
 
`m` can be shadowed or overwritten, so be careful.

It's also possible to shorten the reference if using a class from the same module or namespace:

```html
<template ooml="class" name="Eggplant">
  <m name="fromModule">
    function () {
      return new this.module.B.C.D.Exciting();
    }
  </m>
  
  <m name="fromNamespace">
    function () {
      return new this.namespace.Exciting();
    }
  </m>
</template>
```

`module` and `namespace` exist on every instance of `ooml.Instance`.

# Python

Import the other class, like normal Python:

```python
from A.B.C.D import Exciting

class Eggplant(Exciting):
  ...
```

The Python syntax for `from` references applies. For example, it's possible to import a class from the same namespace using a relative import:

```python
from . import Exciting

class Eggplant:
  def method(self):
    return Exciting()
```

<!-- end tabbed sections --> 
