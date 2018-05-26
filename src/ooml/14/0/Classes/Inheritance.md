<!-- start tabbed sections -->

# HTML

Inheritance is achieved in ooml by using the `parent` attribute:

```html
<template ooml="class" name="SomeClass" parent="ParentClass"></template>
```

# Python

The regular syntax for extending a class is used: 

```python
class SomeClass(ParentClass):
  ...
```

<!-- end tabbed sections -->

Properties can be overriden on the child class, but only some things are allowed:

- Change the getter or setter.
- Add a change listener.
- Add dispatch handlers.
- Add binding change and missing listeners.
- Change the default value.

The change listener, dispatch handlers, and binding listeners on properties are always called, even if a child class sets their own on their property.
However, getters and setters are only called if their property has not been overriden by a property with a getter or setter.

<!-- start tabbed sections -->

# HTML

To override a property or method, just declare it again:

```html
<template ooml="class" name="ParentClass">
  <p name="prop">"value"</p>

  <m name="method">
    function() {
      console.log("From ParentClass");
    }
  </m>
</template>

<template ooml="class" name="ChildClass" parent="ParentClass">
  <p name="prop">3.14</p>

  <m name="method">
    function() {
      console.log("From ChildClass");
    }
  </m>
</template>
```

Use the standard [`super`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/super) JavaScript keyword to call the parent method from an overriden method.

# Python

Use the standard syntax for overriding a method:

```python
class ParentClass:
  def method(self):
    print("From ParentClass")
    
class ChildClass(ParentClass):
  def method(self):
    print("From ChildClass")
```

<!-- end tabbed sections -->

The view of a class can also be inherited — see [View extension](#View extension) for details. Fields are not inherited.
