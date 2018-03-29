# ooml
An object orientated, declarative, modern web UI anti-framework. Fast, easy to use, advanced, lightweight, and compatible with IE 9.

## Features

### Easy setup
To use ooml, just drop in the JS library. There's no environment to set up, build systems to use, or dependencies to manage. Get all of the benefits of an advanced framework with none of the baggage. Also, being so independent, it has no requirements or limitations on the tools and environments you use, so you can reuse most existing common toolchains, or make your own perfect one.

### Incredibly simple
You only need to understand JSON and basic object orientation in order to use ooml. ooml is very declarative, and does not require you to learn any special languages or tools. Unlike most other frameworks, you can start creating scalable, advanced apps with knowledge picked up quickly, and learn the more advanced stuff when you need to.

### Very fast
ooml has no virtual DOM, because it is already the most efficient it can be. There are no hidden performance costs or traps to be avoided. ooml's DOM abstraction is simple, so it's very easy to understand, and its performance linearly scales with its use. All of this comes in a tiny 12 KB, gzipped, CDN-delivered [ooml.js](https://wilsonl.in/ooml.latest.js) file.

### Have it your way
ooml has a global store, message broker, and event system. Additionally, take advantage of abstract classes, union type checking, inheritance, constructors, getters and setters, mutation observers, serialisers and unserialisers, and so much more, to create your perfect app or library, your way. Because of the way it's designed, you can already use almost every existing web library out there.

### High safety
Features like type checking can help reduce and prevent bugs in your code. A big proportion of ooml's code is dedicated to checking and validating, whether its syntax, state, or external data. In fact, [ooml-nano](https://wilsonl.in/ooml-nano/), the version of ooml without checks, is around 40% smaller.

### So much more
Don't mistake ooml's simplicity for lack of features or scalability. Check out the [guides](https://wilsonl.in/ooml/guides/) or [documentation](https://wilsonl.in/docs/ooml/) to see the all the neat stuff about ooml.

## Quick example

Here's a simple to-do list app ([view it live in your browser](https://wilsonl.in/ooml/examples/to-do-list-1/code.html)):

```html
<script src="https://wilsonl.in/ooml.latest.js"></script>

<!-- Use <template> to declare classes -->
<template ooml-class="Item">
  <!-- A class property can be declared like so: -->
  <ooml-property name="label">""</ooml-property>

  <!-- Declare the view of the class at the end -->
  <li>{{ this.label }}</li>
</template>

<template ooml-class="List">
  <!-- The value inside the ooml-property tag is its default value -->
  <ooml-property name="name" type="string">""</ooml-property>
  <ooml-property name="items" type="Item" array>[]</ooml-property>

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

<template ooml-class="App">
  <ooml-property name="list" type="List">null</ooml-property>

  <div id="app">
    <h1>Open your console and try adding items to this list</h1>
    {{ this.list }}
  </div>
</template>

<!-- Quickly bootstrap by declaring an initial instantiation -->
<!-- ooml will create an App instance called `app` and put it here -->
<div ooml-instantiate="App app"></div>

<script>
  // Start your engines!
  var namespace = new OOML.Namespace();
  // Here's our initial instance called `app`
  var app = namespace.objects.app;
</script>
```

Running the above HTML page in your browser, try these in your browser's console and notice the similarity to plain JavaScript syntax:

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
```

Open up the console, tinker with the `app` variable, and see how easy it is to utilise the DOM abstraction. Every constructed object is just composed of primitive values, arrays, and more objects, which makes it extremely easy to traverse, manipulate, and serialise at any level.

Every object and array is self-contained, so it's really easy to encapsulate, isolate, and pass around parts of the app, just like regular objects and arrays.

The next example adds controls so the user can actually modify and save the list. It also enables Markdown input, to show how easy it is to use custom HTML and external libraries in ooml. Continue reading [here](https://wilsonl.in/ooml/examples/to-do-list-2/).

## Getting started

- [Quick start](https://wilsonl.in/ooml/quick-start/)
- [Guides](https://wilsonl.in/ooml/guides/)
- [Examples](https://wilsonl.in/ooml/examples/)
- [Documentation](https://wilsonl.in/docs/ooml/)



- [npm](https://www.npmjs.com/package/ooml)
- [yarn](https://yarn.fyi/ooml)
- [ooml.js latest version](https://wilsonl.in/ooml.latest.js)
