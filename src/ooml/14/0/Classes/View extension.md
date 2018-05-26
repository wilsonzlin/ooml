Normally, when inheriting a class, the view of the parent class is not inherited in any way, shape, or form. However, this can be allowed, by declaring an **extension point** on the parent class's view:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class" name="ParentClass">
  <div>
    <h1>ParentClass's view</h1>
    <!-- Here's the extension point tag -->
    <ooml-extension-point></ooml-extension-point>
  </div>
</template>
```

# Python

```python
class ParentClass:
  view = """
    <div>
      <h1>ParentClss's view</h1>
      <!-- Here's the extension point tag -->
      <ooml-extension-point></ooml-extension-point>
    </div>
  """
```

<!-- end tabbed sections -->

Now, when classes inherit *ParentClass*, a copy of *ParentClass*'s view will be copied to the child class, and then the child class's view will go into the copied view, at the `<ooml-extension-point>` tag position:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class" name="ChildClass" parent="ParentClass">
  <p>
    This is ChildClass's view.
  </p>

  <!--
    ChildClass's actual view is:

    <div>
      <h1>ParentClass's view</h1>
      <p>
        This is ChildClass's view.
      </p>
    </div>
  -->
</template>
```

# Python

```python
class ChildClass(ParentClass):
  view ="""
    <p>
      This is ChildClass's view.
    </p>
    
    <!--
      ChildClass's actual view is:
    
      <div>
        <h1>ParentClass's view</h1>
        <p>
          This is ChildClass's view.
        </p>
      </div>
    -->
  """
```

<!-- end tabbed sections -->

Essentially, the child class's view is wrapped around the parent class's view, instead of being on its own.

The child class's view still has the same limitations as any other view. These limitations are described at [Declaring views](#Declaring views).
