ooml is compatible with all modern browsers, and Internet Explorer version 9 and above.

ooml has built-in polyfills for features missing in the browser (detected using feature detection). They are optimised for ooml so it is recommended to load ooml before loading any polyfills (e.g. *es6-shim* or *core-js*). Recommended browsers are ones that support:

- [Data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
- [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
- [&lt;template&gt;](https://developer.mozilla.org/en/docs/Web/HTML/Element/template)

ooml's versioning follows [semver](http://semver.org/). For example, with version *15.9.33*:

- **15** is the major number
- **9** is the minor number
- **33** is the patch number

When comparing two versions:

- A change in the major number denotes that there are incompatible differences between them.
- A change in the minor number but not the major number usually denotes that new features were added in the greater version.
- A change in only the patch number usually denotes that bugs were fixed in the greater version.
- They are only compatible if their *major* numbers are the same, regardless of their minor or patch numbers:
    - *15.9.33* **is** compatible with:
        - *15.10.7*
        - *15.8.33*
        - *15.1.8*
        - *15.9000.222*
    - *15.9.33* **is not** compatible with:
        - *16.5.0*
        - *14.9.33*
        - *0.1.8*
        - *3000.32.10*

Versions with a major number below 14 are deprecated and should not be used. They lack documentation, tests, and change history, and were only designed for private use. They are considered "prehistoric". Use them at your own risk.

To see all versions and change history, go [here](https://wilsonl.in/ooml/versions).
