Namespaces group together classes and identify them from classes in other namespaces. Namespaces can also contain other namespaces.

Referencing a namespace is done using the dot syntax. For example, to refer to a class `C` inside a namespace called `B`, which itself is in the namespace `A`, use `A.B.C`.

For an app, generally only one namespace is needed.

For libraries, namespaces can be useful as another layer of encapsulation and organisation.

Here is an example of a namespace containing two (empty) classes:

```html
<div id="my-namespace">
  <template ooml-class="Class1"></template>
  <template ooml-class="Class2"></template>
</div>
```

Namespaces are registered with the runtime, so that references to namespaces and classes can be satisfied. This also prevents two namespaces or classes from having the exact same reference. 

All classes must be in a namespace; there is no way to declare classes by themselves.
