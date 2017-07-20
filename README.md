# ooml
An object-orientated modern web UI anti-framework.

## Why use ooml

### Easy setup
To use ooml, drop in the JS library... and you're done. There's no environment to set up, build systems to use, or dependencies to manage. Get all of the benefits of an advanced framework with none of the baggage.

### Incredibly simple
Pre-requisites for learning ooml: JSON, and basic object orientation. That's it. There's no special language to learn, overly weird syntax to cover, or even a strong opinion to understand. Unlike most other frameworks, you can start creating scalable, super large apps with immediate knowledge picked up quickly, and learn the more advanced 10% when you need to.

### Very efficient
ooml has no virtual DOM, because it is already the most efficient it can be. The performance of your app is directly proportional to your code. There's no hidden performance costs or traps to be avoided. ooml's DOM abstraction is simple, so it's very easy to understand, and it's performance linearly scales with its use. All of this comes in a tiny 11 KB gzipped [ooml.js](https://wilsonl.in/ooml.js) file.

### Have it your way
Want to use a global store? ooml's got you covered. Prefer to use events instead? No problem. Take advantage of abstract classes, type checking, inheritance, constructors, advanced methods syntax, getters, setters and change listeners, mutation observers, serialisers and unserialisers, and so much more, to create your perfect app or library, your way.

### So much more
Check out [ooml's guides](https://wilsonl.in/docs/ooml) to see the all the neat stuff about ooml.


## Learn ooml in 10 minutes

Let's create a to-do list app. No long instructions, just observe the single HTML file needed ([view it live](https://wilsonl.in/ooml/examples/to-do-1.html)):

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My to-do list</title>
        <script src="https://wilsonl.in/ooml.js"></script>
    </head>

    <body>
        <!-- In ooml, we have classes, and construct objects from them, just like most object-orientated languages... -->
        <template ooml-class="Item">
            <ooml-property name="label">""</ooml-property>

            <!-- ...but ooml classes also have HTML to represent the view of the class (this is web development after all) -->
            <li>{{ this.label }}</li>
        </template>

        <!-- Here's our List class -->
        <template ooml-class="List">
            <div>
                <h2>{{ this.name }}</h2>
                <ul>
                    <ooml-substitution property="items" class="Item" array></ooml-substitution>
                </ul>
            </div>
        </template>

        <template ooml-class="App">
            <div id="app">
                <ooml-substitution property="list" class="List"></ooml-substitution>
            </div>
        </template>

        <!-- Declaring a whole bunch of classes is nice, but we still need to create something to show in the browser -->
        <!-- In ooml, you can quickly bootstrap your app by declaring a place to initially create an instance of a class -->
        <div ooml-instantiate="App app"></div>

        <script>
            // Later on, you'll utilise the ability to have many namespaces
            let namespace = new OOML.Namespace();
            // Our namespace object looks like this:
            // { objects: { app: [OOML.Element] }, classes: { Item: [OOML.Class], List: [OOML.Class], App: [OOML.Class] } }
            // Lets alias our app to make it easier to reference
            let app = namespace.objects.app;

            // Examples
            app.list.name = "My to-do list";
            app.list.items.push({ name: "First item" });
            app.list.items.push(new namespace.classes.Item({ name: "Second item" }));
            app.list.items.sort("name");
            let firstItem = app.list.items.shift();
            app.list.items.unshift(firstItem);
            app.list.items.get(0).name = "1st item";
        </script>
    </body>
</html>
```

Open up your console, use the `app` variable, and see how easy it is to utilise the DOM abstraction. Every constructed object is just composed of primitive values, arrays and more objects, which makes it extremely easy to traverse, manipulate and serialise at any level.

Now, lets quickly add some controls so the user can actually modify and save the list. As a bonus, we'll enable Markdown input, to show just how easy it is to use HTML and external libraries in ooml ([view it live](https://wilsonl.in/ooml/examples/to-do-2.html)):

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
            <!-- ooml properties can have type hinting, getters, setters, and change listeners -->
            <ooml-property name="label" type="string"
                set="return { HTML: `<span>${ marked(newValue) }</span>` }"
            >""</ooml-property>

            <li>{{ this.label }}</li>
        </template>

        <template ooml-class="List">
            <div>
                <h2>{{ string this.name }}</h2>
                <ul>
                    <ooml-substitution property="items" class="Item" array></ooml-substitution>
                </ul>

                <!-- Binding to DOM events is extremely simple -->
                <form domonsubmit="
                    event.preventDefault();
                    this.items.push({ label: this.$newItemInput.value });
                    this.$newItemInput.value = '';
                ">
                    <input ooml-expose="newItemInput" placeholder="You can use Markdown!">
                    <button>Add new item</button>
                </form>

                <br>

                <!-- Serialisation is tightly built in to all objects and arrays -->
                <button domonclick="prompt('Here is the JSON:', this.toJSON())">Serialise this list</button>
            </div>
        </template>

        <template ooml-class="App">
            <div id="app">
                <!-- Normally, nested instance objects are not initialised when the main object is constructed -->
                <!-- However, if it will always have a familiar structure, or you need it to be immediately available, -->
                <!-- you can set a default state for the object, and it will be built alongside the main object -->
                <!-- Since everything in ooml is just JSON, we can very easily describe the default value of our app's list -->
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
