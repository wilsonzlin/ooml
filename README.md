# ooml
An object-orientated modern web UI anti-framework.

## Why use ooml?

### Easy setup
To use ooml, drop in the JS library... and you're done. There's no environment to set up, build systems to use, or dependencies to manage. Get all of the benefits of an advanced framework with none of the baggage. Also, being so independent, it has no requirements or limitations on the tools and environments you use, so you can reuse most existing common toolchains, or make your own perfect one.

### Incredibly simple
If you are a web developer, the additional prerequisites for learning ooml are: 1) JSON, and 2) basic object orientation. That's it. There are no special languages and tools that you must learn and use. Unlike most other frameworks, you can start creating scalable, super-large apps with knowledge picked up quickly, and learn the more advanced stuff when you need to.

### Very fast
ooml has no virtual DOM, because it is already the most efficient it can be. The performance of your app is directly proportional to your code. There are no hidden performance costs or traps to be avoided. ooml's DOM abstraction is simple, so it's very easy to understand, and it's performance linearly scales with its use. All of this comes in a tiny 11 KB gzipped CDN-delivered [ooml.js](https://wilsonl.in/ooml.js) file.

As an example, compared to React + Redux, [ooml's raw performance is 2-3x better](https://wilsonl.in/ooml/comparisons/raw-performance/react-redux.html).

### Have it your way
ooml has a global store, message broker, and event system. Additionally, take advantage of abstract classes, union type checking, inheritance, constructors, advanced methods syntax, getters, setters and change listeners, mutation observers, serialisers and unserialisers, and so much more, to create your perfect app or library, your way. And because of the way it's designed, you can already use almost every existing web library out there.

### Safety

TODO

### So much more
Don't mistake ooml's simplicity for lack of features. Check out [ooml's guides](https://wilsonl.in/docs/ooml) to see the all the neat stuff about ooml.

## Quick example

Let's create a to-do list app. No long instructions, just quickly scan through the single and only HTML file needed ([view it live in your browser](https://wilsonl.in/ooml/examples/to-do-list-1.html)):

Note that this page **doesn't render anything initially**; the point is to demonstrate the syntax and API.

Check out the JS snippet immediately after this HTML block.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My to-do list</title>
        <script src="https://wilsonl.in/ooml.js"></script>
    </head>

    <body>
        <!--
            In ooml, we have classes, and construct objects from them,
            just like most object-orientated languages...
        -->
        <template ooml-class="Item">
            <ooml-property name="label">""</ooml-property>

            <!--
                ...but ooml classes also have HTML to represent the
                view of the class (this is a web UI framework after all)
            -->
            <li>{{ this.label }}</li>
        </template>

        <!-- Here's our List class -->
        <template ooml-class="List">
            <div>
                <!--
                    Notice the braces: this means that whatever value of
                    "name" is will go here, updating itself automatically
                    whenever the value changes
                -->
                <!--
                    This is known as substitution
                -->
                <h2>{{ this.name }}</h2>
                <ul>
                    <!--
                        We can also substitute other instances of OOML
                        classes, or arrays of them, by using a tag instead
                        of braces
                    -->
                    <!--
                        This is an array of Item instances (which makes sense)
                    -->
                    <ooml-substitution property="items" class="Item" array></ooml-substitution>
                </ul>
            </div>
        </template>

        <!--
            This is our App class. Note that this isn't necessary, but it's nice
            to have a single top-level class that represents our entire app
        -->
        <template ooml-class="App">
            <div id="app">
                <ooml-substitution property="list" class="List"></ooml-substitution>
            </div>
        </template>

        <!--
            Declaring a whole bunch of classes is nice,
            but we still need to create something to show in the browser
        -->
        <!--
            In ooml, you can quickly bootstrap your app by declaring a class
            to initially create an instance of, and where to place it
        -->
        <!--
            In this case, we're declaring a new instance of the class App,
            and naming that instance object "app", so we can refer to it later
        -->
        <div ooml-instantiate="App app"></div>

        <script>
            // Don't worry about these for now; just consider them as code
            // that parses your classes and bootstraps your app
            let namespace = new OOML.Namespace();
            let app = namespace.objects.app;
        </script>
    </body>
</html>
```

```javascript
// Try these in your console and notice the similarity to plain JavaScript syntax

app.list = { name: "My to-do list" };

app.list.items.push({ label: "First item" });

app.list.items.push(new namespace.classes.Item({ label: "Second item" }));

app.list.items.sort("label");

let firstItem = app.list.items.shift();

firstItem.label = "No. 1";

app.list.items.unshift(firstItem);

app.list.items.get(0).label = "1st item";
```

Open up the console, tinker with the `app` variable, and see how easy it is to utilise the DOM abstraction. Every constructed object is just composed of primitive values, arrays and more objects, which makes it extremely easy to traverse, manipulate, and serialise at any level.

Every object and array is self-contained, so it's really easy to encapsulate, isolate, and pass around parts of the app, just like regular objects and arrays.

Now, lets quickly add some controls so the user can actually modify and save the list. As a bonus, we'll enable Markdown input, to show just how easy it is to use HTML and external libraries in ooml ([view it live in your browser](https://wilsonl.in/ooml/examples/to-do-list-2.html)):

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My to-do list</title>
        <script src="https://wilsonl.in/ooml.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js"></script>
    </head>

    <body>
        <template ooml-class="Item">
            <!--
                ooml properties can have type hinting, getters, setters, and change listeners
            -->
            <!--
                You can display rich HTML rather than just the value of a property
            -->
            <ooml-property name="label" type="string"
                set="return { HTML: `<span>${ marked(newValue) }</span>` }"
            >""</ooml-property>

            <li>
                <span>{{ this.label }}</span>
                <button domonclick="dispatch('delete', { item: this })">Delete</button>
            </li>
        </template>

        <template ooml-class="List">
            <div>
                <h2>{{ string this.name }}</h2>
                <ul>
                    <ooml-substitution property="items" class="Item" array
                        dispatchondelete="data.item.detach()"
                    ></ooml-substitution>
                </ul>

                <!--
                    Binding to DOM events is extremely simple
                -->
                <form domonsubmit="
                    event.preventDefault();
                    this.items.push({ label: this.$newItemInput.value });
                    this.$newItemInput.value = '';
                ">
                    <!--
                        Sometimes, we actually want to expose the DOM, not hide it away
                    -->
                    <input ooml-expose="newItemInput" placeholder="You can use Markdown!">
                    <button>Add new item</button>
                </form>

                <br>

                <!--
                    Serialisation is tightly built in to all objects and arrays
                -->
                <button domonclick="prompt('Here is the JSON:', this.toJSON())">Serialise this list</button>
            </div>
        </template>

        <template ooml-class="App">
            <div id="app">
                <!--
                    Normally, substitution objects in a class are not
                    initialised when the main object is constructed.
                -->
                <!--
                    However, if it will always have a familiar structure,
                    or you need it to be immediately available, you can
                    set a default state for the object, and it will be
                    built alongside the main object.
                -->
                <!--
                    Since everything in ooml is just JSON, we can very
                    easily describe the default value of our app's list.
                -->
                <ooml-substitution property="list" class="List">{
                    name: "My list"
                }</ooml-substitution>
            </div>
        </template>

        <div ooml-instantiate="App app"></div>

        <script>
            let namespace = new OOML.Namespace();
            let app = namespace.objects.app;
        </script>
    </body>
</html>
```

## Learning ooml in 15 minutes

## Getting started

## Help improve ooml

This project needs everyone's help to make ooml a great experience for everyone. Help out by reporting bugs, contributing code, improving documentation, pointing out annoyances (small or fundamental), and suggesting what you want to see in the future. You can direct these to this project by creating [issues](https://github.com/lerouche/ooml/issues) or [pull requests](https://github.com/lerouche/ooml/pulls).
