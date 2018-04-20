# ooml
An object orientated web UI framework. Fast, easy to use, advanced, lightweight, and compatible with IE 9.

## Features

### Easy setup
- Single, drop-in 12 KB gzipped [ooml.js](https://wilsonl.in/ooml.js) file.
- No dependencies or toolchain/environment requirements.

### Incredibly simple
- Only need to understand JSON and basic object orientation.
- No special language, and usage is designed to be identical to vanilla JavaScript.
- Clean stack traces with near zero framework noise.
- Gradual learning curve&mdash;create large, scalable apps with only a few concepts.

### Very fast
- No virtual DOM.
- [Faster than the most popular frameworks](https://wilsonl.in/ooml/performance/comparisons/) while using less memory.
- Asynchronously load ooml.js compressed, CDN delivered, and highly cacheable.
- Optionally precompile to bytecode:
  - Get bonus static checks and optimisations.
  - Load a 5KB VM-only ooml.js and tiny, compressed bytecode.
  - Remove runtime parsing, type checking, and assertions to boost performance and reduce bloat.

### Have it your way
- Integrated with a global store, message broker, and event system.
- Abstract classes, type hinting, change listeners&mdash;all are available, and more.
- Everything's JSON, so model your app like your data and get single-line serialisation and deserialisation.
- HTML in JS, JS in HTML, or both? Declarative and imperiative options available.

### Ready for reuse
- Almost every existing JS library out there is already compatible.
- Easily share modules by precompiling them and hosting the single bytecode file anywhere.
- Import ooml modules asynchronously using regular `<script>`, and potentially get them compressed, CDN delivered, and highly cacheable.

### High safety
- Type hinting and strict syntax helps reduce and prevent bugs.
- Large amounts of code dedicated to checking and validating.

There's so much more&mdash;check out the [documentation](https://wilsonl.in/docs/ooml/), or read the [quick start](https://wilsonl.in/ooml/quick-start/).

## Quick example

Here's a simple to-do list app declared using HTML form ([view it live in your browser](https://wilsonl.in/ooml/examples/to-do-list-1/code.html)):

```html
<script src="https://wilsonl.in/ooml.js"></script>

<!-- Use <template> to declare classes -->
<template ooml="class" name="Item">
  <!-- A class property can be declared like so: -->
  <p name="label"></p>

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

  <!-- Methods are declared with m tags -->
  <!-- This is a special method called the postConstructor -->
  <m name="postConstructor">
    function() {
      // Just so we can tinker around with this demo in the console
      window.app = this;
      window.namespace = this.namespace;
    }
  </m>

  <div id="app">
    <h1>Open your console and try adding items to this list</h1>
    {{ this.list }}
  </div>
</template>

<!-- Quickly bootstrap by declaring an initial instantiation -->
<!-- ooml will create an App instance and put it here -->
<div ooml="instantiate" type="App"></div>
```

Running the above HTML page in your browser, try these in your browser's console
and notice the similarity to plain JavaScript syntax:

```javascript
// Every instance is modelled as a basic object (think JSON)
app.list = { name: "My to-do list" };

// Arrays are modelled just like native arrays, and have all their methods
app.list.items.push({ label: "First item" });

// You can also use declared ooml classes like regular JS classes
var Item = namespace.Item;
var item = new Item({ label: "2nd item" });
app.list.items.push(item);

// Every object and array is fully encapsulated
var firstItem = app.list.items.shift();
firstItem.label = "No. 1";
app.list.items.unshift(firstItem);

// There are also some helper methods
app.list.items.sortBy("label");

// Most of your code will look like vanilla JS
// This gives you more flexibility, very readable code, and nearly no learning curve
app.list.items.get(0).label = "1st item";

// With one line, get your entire app in JSON...
var json = JSON.stringify( app.toJSON() );
app.list = null; // Pretend we're starting again
// ...and with one line, restore your entire app from JSON
Object.assign(app, JSON.parse(json))
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
