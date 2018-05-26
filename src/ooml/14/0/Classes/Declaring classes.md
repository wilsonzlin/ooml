**Classes** are the templates for creating ooml instances. They:

- have properties, methods, and fields
- can be extended, inheriting properties and methods from ancestor classes
- have advanced features like abstract classes, constructors, serialisation and deserialisation, and factory methods, and
- are also JavaScript classes, making it very easy to use them in JavaScript logic.

<!-- start tabbed sections -->

# HTML

Classes are declared using HTML `template` tags in the HTML file:

```html
<template ooml-class="MyClass"></template>
```

`<template>` ensures faster processing as browsers that support it will not try to render the contents of it.

Inside the class, everything is declared:

- one or more [initialisers](#Initialisation)
- a few tags that describe the [properties](#Declaring properties), [methods](Declaring methods), and [fields](#Declaring fields) of the class
- the [view](#Declaring views) of the class is laid out

Here is an example that contains a bit of everything:

```html
<template ooml-class="MyClass">
  <f name="field1">1</f>

  <i>
    alert("Hello")
  </i>

  <p name="prop1">null</p>
  <p name="prop2">null</p>
  <p name="prop3">null</p>

  <m name="postConstructor">
    function () {
      alert("Hello")
    }
  </m>

  <m name="method1">
    function () {
      alert("Method 1");
    }
  </m>

  <m name="method2">
    function () {
      alert("Method 2");
    }
  </m>

  <div>
    <h1>Instance of my class</h1>
    <em>Hooray!</em>
  </div>
</template>
```

If a class doesn't explicitly declare its parent (i.e. doesn't have `extends` in its `ooml-class` attribute), it implicitly extends `ooml.Instance`. This means that `ooml.Instance` is the base class/type of all ooml classes.

# JS

```javascript
import {Instance} from "org.ooml.oomllib.js.ail"

class MyClass extends Instance {}
```

# TSX

```typescript
import {Instance} from "org.ooml.oomllib.js.ail"

class MyClass extends Instance {}
```

# Java

```java
import org.ooml.oomllib.java.ail.Instance;

class MyClass extends Instance {}
```

# Python

```python
from org.ooml.oomllib.python.ail import Instance

class MyClass(Instance):
    ...
```

<!-- end tabbed sections -->
