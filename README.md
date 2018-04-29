# ooml
An object orientated web UI framework. Fast, easy to use, advanced, lightweight, and compatible with IE 9.

## Features

### Incredibly simple
- Only need to understand JSON and basic object orientation.
- No dependencies or toolchain/environment requirements.
- No special language, and usage is designed to be identical to vanilla JavaScript.
- Gradual learning curve&mdash;create large, scalable apps with a few concepts.

### Have it your way
- Integrated with a global store, message broker, and event system.
- Abstract classes, type hinting, change listeners&mdash;all are available, and more.
- Write in HTML, JS, [Python, Java, Ruby, and more](https://github.com/ooml/oomlvm).

### Very fast
- No virtual DOM; asynchronous DOM updates.
- [Very fast with low memory usage](https://ooml.org/performance/), even in IE 9.
- Asynchronously load a 12 KB gzipped [ooml.js](https://ooml.org/ooml.js) compressed, CDN delivered, and highly cacheable.
- Optionally compile to bytecode:
  - Get bonus static checks and optimisations.
  - Load a 5 KB [VM-only ooml.js](https://github.com/ooml/oomlvm) and compressed bytecode.
  - Remove runtime parsing, type checking, and assertions for faster performance.

### Ready for reuse
- Almost every existing JS library out there is already compatible.
- Easily share modules by precompiling them and hosting the single bytecode file anywhere.

### High safety
- Type hinting and strict syntax helps reduce and prevent bugs.
- Large amounts of code dedicated to checking and validating.
- Use of `undefined` and assigning to non-existent properties are prevented.

There's so much more&mdash;check out the [documentation](https://ooml.org/docs/ooml/), or read the [quick start](https://ooml.org/quick-start/).

## Quick example

Here's a simple to-do list app declared using HTML form ([view it live in your browser](https://ooml.org/examples/to-do-list-1/code.html)):

```html
<script src="https://ooml.org/ooml.js"></script>

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

The next example adds controls so the user can actually modify and save the list. It also enables Markdown input, to show how easy it is to use custom HTML and external libraries in ooml. Continue reading [here](https://ooml.org/examples/to-do-list-2/).

## Getting started

- [Quick start](https://ooml.org/quick-start/)
- [Guides](https://ooml.org/guides/)
- [Examples](https://ooml.org/examples/)
- [Documentation](https://ooml.org/docs/ooml/)

## Start using

- [npm](https://www.npmjs.com/package/ooml)
- [yarn](https://yarn.fyi/ooml)
- [ooml.js latest version](https://ooml.org/ooml.js)
