The final step of starting an application is to run something. In almost every language and program, this is done by creating a new instance of a "main class" and/or running a "main" function immediately.

Similarly, in ooml, some class is chosen to be instantiated immediately after parsing all the classes. The code to kickstart the app is then written in this class's constructor. This is known as an **initial instantiation**.

An initial instantiation is declared inside a namespace declaration. To declare one, use the `ooml-attribute` attribute on a tag:

```html
<div id="my-namespace">
  <template ooml-class="MyMainClass">
    <article>
      <h1>Hello, world!</h1>
    </article>
  </template>

  <article ooml-instantiate="MyMainClass myMainClass"></article>
</div>
```

The name of the tag with `ooml-instantiate` must match the name of the root element of the target class's view.

The value for the `ooml-instantiate` attribute has two parts:

1. The name of the class to instantiate
1. The name to give the instance object once it has been instantiated

When the above namespace is parsed by creating a new instance of `OOML.Namespace`, that namespace instance will have a property called `objects`. This property's value will be an object, and it will have a property called `myMainClass`. Its value is the instance object of the newly created `MyMainClass` instance.

The newly created `MyMainClass` instance's view will replace the `ooml-instantiate` tag (i.e. it will be placed at the exact same location as the declaration).
