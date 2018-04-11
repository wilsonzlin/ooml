# ooml
An object orientated web UI framework. Fast, easy to use, advanced, lightweight, and compatible with IE 9.

## Features

### Easy setup
- Single, drop-in 12 KB [ooml.js](https://wilsonl.in/ooml.js) file.
- No dependencies or toolchain/environment requirements.

### Incredibly simple
- Only need to understand JSON and basic object orientation.
- API is designed to be identical to vanilla JavaScript.
- Gradual learning curve&mdash;create large, scalable apps with only a few concepts.

### Very fast
- No virtual DOM.
- Up to [6x faster](https://wilsonl.in/ooml/comparisons/react/) than React.
- Optionally precompile to bytecode, and get bonus static checks and optimisations.

### Have it your way
- Integrated with a global store, message broker, and event system.
- Collect and traverse history without immutable structures.
- Abstract classes, type hinting, mutation observers, automatic serialisers&mdash;all are available, and more.
- HTML in JS, JS in HTML, or both? ooml says: yes.

### Ready for packages
- Due to its design, almost every existing JS library out there is already usable.
- Publish modules to [ooml.store](https://ooml.store) with strictly-enforced [semver](#https://semver.org).
- Import [ooml.store](https://ooml.store) modules with a `<script>` to get them optimised, CDN delivered, and highly cacheable.

### High safety
- Type hinting and strict syntax helps reduce and prevent bugs.
- Large amounts of code dedicated to checking and validating.
- [ooml-nano](https://wilsonl.in/ooml-nano/), the version without checks, is 40% smaller and 20% faster.

There's so much more&mdash;check out the [documentation](https://wilsonl.in/docs/ooml/), or read the [quick start](https://wilsonl.in/ooml/quick-start/).

## Quick example

Here's a simple to-do list app ([view it live in your browser](https://wilsonl.in/ooml/examples/to-do-list-1/code.html)):

```html
<script src="https://wilsonl.in/ooml.js"></script>

<div ooml="namespace">

  <!-- Use <template> to declare classes -->
  <template ooml="class" name="Item">
    <!-- A class property can be declared like so: -->
    <p name="label">""</p>

    <!-- Declare the view of the class at the end -->
    <li>{{ this.label }}</li>
  </template>

  <template ooml="class" name="List">
    <!-- The value inside the p (short for property) tag is its default value -->
    <p name="name" type="string">""</p>
    <p name="items" type="Item" array>[]</p>

    <div>
      <!-- Use braces to substitute property values into the view -->
      <!-- If the value is updated, so will this part of the view -->
      <h2>{{ this.name }}</h2>
      <ul>
        <!-- You can even substitute other instances or arrays of them -->
        {{ this.items }}
      </ul>
    </div>
  </template>

  <template ooml="class" name="App">
    <p name="list" type="List">{}</p>

    <div id="app">
      <h1>Open your console and try adding items to this list</h1>
      {{ this.list }}
    </div>
  </template>

</div>

<!-- Quickly bootstrap by declaring an initial instantiation -->
<!-- ooml will create an App instance called `app` and put it here -->
<div ooml="instantiate" type="App" name="app"></div>

<script>
  // Start your engines!
  var namespace = new OOML.Namespace();
  // Here's our initial instance called `app`
  var app = namespace.objects.app;
</script>
```

Running the above HTML page in your browser, try these in your browser's console
and notice the similarity to plain JavaScript syntax:

```javascript
// Every instance is modelled as a basic object (think JSON)
app.list = { name: "My to-do list" };

// Arrays are modelled just like native arrays, and have all their methods
app.list.items.push({ label: "First item" });

// You can also use declared ooml classes like regular JS classes
var Item = namespace.classes.Item;
var item = new Item({ label: "Second item" });
app.list.items.push(item);

// Another example of the very vanilla-like syntax
app.list.items.sort("label");

// Every object and array is fully encapsulated, as you'd expect
var firstItem = app.list.items.shift();
firstItem.label = "No. 1";
app.list.items.unshift(firstItem);

// Most of your code will look like vanilla JS
// This gives you more flexibility, very readable code, and nearly no learning curve
app.list.items.get(0).label = "1st item";

// With one method, get your entire app in JSON...
var json = app.toJSON();
app.list = null; // To test out the next part, delete something
// ...and with two methods, restore your entire app from JSON
app.assign( JSON.parse(json) ); // or Object.assign( app, JSON.parse(json) )
```

Open up the console, tinker with the `app` variable, and see how easy it is to utilise the DOM abstraction. Every constructed object is just composed of primitive values, arrays, and more objects, which makes it extremely easy to traverse, manipulate, and serialise at any level.

Every object and array is self-contained, so it's really easy to encapsulate, isolate, and pass around parts of the app, just like regular objects and arrays.

The next example adds controls so the user can actually modify and save the list. It also enables Markdown input, to show how easy it is to use custom HTML and external libraries in ooml. Continue reading [here](https://wilsonl.in/ooml/examples/to-do-list-2/).

## Getting started

- [Quick start](https://wilsonl.in/ooml/quick-start/)
- [Guides](https://wilsonl.in/ooml/guides/)
- [Examples](https://wilsonl.in/ooml/examples/)
- [Documentation](https://wilsonl.in/docs/ooml/)

## Start using

- [npm](https://www.npmjs.com/package/ooml)
- [yarn](https://yarn.fyi/ooml)
- [ooml.js latest version](https://wilsonl.in/ooml.js)
