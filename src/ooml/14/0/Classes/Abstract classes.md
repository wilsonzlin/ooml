Abstract classes cannot be instantiated. Otherwise, they are basically the same as regular classes. They can even have a view.

Abstract classes are typically used for creating a base class for subclasses to extend from, implementing the common traits between them to reduce repetition, and giving them a common base type.

<!-- start tabbed sections -->

# HTML

Add the `abstract` boolean tag attribute:

```html
<template ooml="class" name="BaseClass" abstract></template>
```

# Python

Apply the `abstract` decorator from oomllib.

```python
from org.ooml.oomllib.python.Class import abstract

@abstract
class BaseClass:
  ...
```

<!-- end tabbed sections -->

For more on extending classes, see [Inheritance](#Inheritance).

Abstract classes can be used as a property's type. However, this poses a problem: when unserialising, how can ooml know what regular class to construct using only the plain JSON object data? This is where factories come into play.

# Factories

A factory is a [special field](#Special fields) that is called when creating an instance of an abstract class. Since it's not possible to create such an instance, an abstract class will check if it has a field called `factory` and that field is a function. If so, it provides whatever the return value of calling it with the initial state is. This means that the factory function is tasked with returning an instance of a regular class so that the problem is avoided.

Here is an example:

<!-- start tabbed sections -->

# HTML

```html
<template ooml="class" name="Thing" abstract>
  <f name="factory">
    function (initState) {
      switch (initState.type) {
      case "person": return new this.namespace.Person(initState);
      case "car": return new this.namespace.Car(initState);
      }
    }
  </f>

  <p name="type">null</p>
</template>

<template ooml="class" name="Person" parent="Thing">
  <p name="type">"person"</p>
  <p name="name">null</p>
  <p name="age">null</p>
  <p name="gender">null</p>
</template>

<template ooml="class=" name="Car" parent="Thing">
  <p name="type">"car"</p>
  <p name="make">null</p>
  <p name="model">null</p>
  <p name="mileage">null</p>
</template>
```

# Python

```python
from . import Person, Car

class Thing:
  @staticmethod
  def factory(init_state):
    return {
      "person": Person,
      "car": Car,
    }.get(init_state.type)(init_state)
```

<!-- end tabbed sections -->

Using factories, for JavaScript, it's possible to assign a plain object to a property with an abstract class as its type. For other languages, it allows marshalling to an instance of a concrete type where an abstract type is declared. Instead of constructing an instance of an abstract class, which is impossible, the factory will intervene and provide an instance of a regular class.
