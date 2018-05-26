After a namespace has been declared, the next step is for it to be parsed, otherwise it's just some HTML.

Namespaces are parsed by creating a new `OOML.Namespace` instance with the namespace declaration's DOM element.

Here is an example of a namespace containing two (empty) classes:

```html
<div id="my-namespace">
  <template ooml-class="Class1"></template>
  <template ooml-class="Class2"></template>
</div>
```

To initialise the above example namespace, the following JavaScript code would be used:

```javascript
let MyNamespace = new OOML.Namespace(document.querySelector("#my-namespace"));
```

By default, if no DOM element is specified (i.e. if no arguments are provided), the DOM element used defaults to `document.body` (i.e. the `<body>` tag).

There are also other ways to call the constructor:

```javascript
let MyNamespace;

// Provide the selector directly
MyNamespace = new OOML.Namespace("#my-namespace");

// Provide the HTML directly (note: the container tag should not be provided)
MyNamespace = new OOML.Namespace(`
  <template ooml-class="Class1"></template>
  <template ooml-class="Class2"></template>
`);

// Use document.body by default
MyNamespace = new OOML.Namespace();
```

If a DOM element is provided, an error will be thrown if an ancestor or descendant of that element was previously used to create an `OOML.Namespace` instance.

`OOML.Namespace` instances have two properties: **instances** and **classes**. See [Initial instantiations](#Initial instantiations) for information about the **instances** property.

The **classes** property is an object containing all the parsed classes. The keys are the names of the classes, and their values are `OOML.Class` instances. Using the previous examples, the structure would look like:

```javascript
MyNamespace.classes === {
    Class1: [object OOML.Class],
    Class2: [object OOML.Class],
}
```
