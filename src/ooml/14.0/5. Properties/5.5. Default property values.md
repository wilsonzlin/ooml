All properties have a default value. It is used as the value for a property when creating a new instance of an ooml class, if no value for that property is provided in the [initial state](#Initial state). A default value is inferred by evaluating the contents of the `p` tag as JavaScript code.

ooml properties without a binding can specify a custom default value. The default value must be compatible with the [type](#Typing) of the property. If one is not specified, the default default value for its type is used.

Note that [transient properties](#Transient properties) can have any non-`undefined` default value. The rules below only apply to non-transient properties.

# Primitive default values

Only properties with a [primitive type](#Typing) can have a non-null primitive default value. Examples of primitive default values are:

```html
<p name="myProp">null</p>
<p name="myProp">"abracadabra"</p>
<p name="myProp">true</p>
<p name="myProp">42</p>
<p name="myProp">3354e232</p>
<p name="myProp">0.1</p>
<p name="myProp">-0.000324325</p>
<p name="myProp">-Infinity</p>
```

Because the value is inferred by evaluating the tag contents as JavaScript, strings must be proper JavaScript strings (i.e. quoted, properly escaped, and on a single line) **and** HTML text data (i.e. HTML entity escaped):

```html
<!-- INVALID -->
<p name="myProp">default string</p>
<!-- Should be -->
<p name="myProp">"default string"</p>
```

```html
<!-- INVALID -->
<p name="myProp">"And they said, "Hello, world!""</p>
<!-- Should be -->
<p name="myProp">"And they said, \"Hello, world!\""</p>
```

```html
<!-- INVALID -->
<p name="myProp">"C:\Windows\system32\"</p>
<!-- Should be -->
<p name="myProp">"C:\\Windows\\system32\\"</p>
```

```html
<!-- INVALID -->
<p name="myProp">"
  Roses are red
  Violets are blue
  Insert rest of quote
  here
"</p>
<!-- Should be -->
<p name="myProp">`
  Roses are red
  Violets are blue
  Insert rest of quote
  here
`</p>
<!-- Alternatively -->
<p name="myProp">
  "Roses are red\n" +
  "Violets are blue\n" +
  "Insert rest of quote\n" +
  "here"
</p>
```

```html
<!-- INVALID -->
<p name="myProp">"Are 4 & 5 < 6?"</p>
<!-- Should be -->
<p name="myProp">"Are 4 &amp; 5 &lt; 6?"</p>
```

Ensure that string values are quoted; there is a slim possibility that ooml cannot pickup that it is invalid, and that is when the default value is the name of global variable. In the next example, the default value of `myProp` is `"global string"`, *not* `"oops"`:

```html
<script>
  window.oops = "global string";
</script>
<template ooml-class="MyClass">
  <!-- DO NOT DO THIS -->
  <p name="myProp">oops</p>
</template>
```

# Instance and array default values

Only properties with a class type can declare their default values as object or array literals. Their default values can also be null. The default value can be thought of as the default [inital state](#Initial state) of the property's instance or array.

In the below example, if no array is provided as `items` in the initial state when creating a new instance of `List`, the `items` property of the new instance will be an array containing three `Item` instances with placeholder names:
```html
<template ooml-class="Item">
  <p name="name" type="string">""</p>
</template>

<template ooml-class="List">
  <p name="name" type="string">""</p>
  <p array name="items" type="Item">[
    { name: "Placeholder 1" },
    { name: "Placeholder 2" },
    { name: "Placeholder 3" },
  ]</p>
</template>
```

Similarly, in the below example, if no instance is provided as `list` in the initial state when creating a new `App`, the new instance will automatically create a `List` instance with a generic name. Since no `items` property is declared in the default value of `list`, the list will have the three placeholder items (see previous example):
```html
<template ooml-class="App">
  <p name="list" type="List">{
    name: "My list 1",
  }</p>
</template>
```
