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

Let's create a to-do list app. No long instructions, just observe the single HTML file needed ([view it live](https://wilsonl.in/ooml/examples/to-do.html)):

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
            <ooml-property name="label" type="string" set="return { HTML: `<span>${ marked(newValue) }</span>` }">""</ooml-property>

            <li>{{ this.label }}</li>
        </template>

        <template ooml-class="List">
            <div>
                <h2>{{ string this.name }}</h2>
                <ul>
                    <ooml-substitution property="items" class="Item" array></ooml-substitution>
                </ul>
                <form domonsubmit="event.preventDefault(); this.items.push({ label: this.$newItemInput.value }); this.$newItemInput.value = ''">
                    <input ooml-expose="newItemInput" placeholder="You can use Markdown!">
                    <button>Add new item</button>
                </form>
                <br>
                <button domonclick="prompt('Here is the JSON:', this.toJSON())">Serialise this list</button>
            </div>
        </template>

        <template ooml-class="App">
            <div id="app">
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
