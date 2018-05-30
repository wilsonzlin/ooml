The easiest way to set up and use ooml is just to load it via a `<script>` tag:

```html
<script async src="https://ooml.org/ooml.<VAR[VERSION-MAJOR]>.<VAR[VERSION-MINOR]>.js"></script>
```

Every version of ooml is available directly from a CDN. They can be accessed using one of the following URL formats:

- [https://ooml.org/ooml.js](https://ooml.org/ooml.js) for the very latest version
- [https://ooml.org/ooml.X.js](https://ooml.org/ooml.X.js) for the latest version with major number X
- [https://ooml.org/ooml.X.Y.js](https://ooml.org/ooml.X.Y.js) for the latest version with major number X and minor number Y
- [https://ooml.org/ooml.X.Y.Z.js](https://ooml.org/ooml.X.Y.Z.js) for version X.Y.Z

[Compatibility and versioning](#Compatibility and versioning) describes how versioning works.

Alternatively, ooml also available as a package on [npm](https://www.npmjs.com/package/ooml) and [yarn](https://yarn.fyi/ooml) (both point to the same package). The ooml.js file is located at `dist/ooml.js` in the package; it is already minified and optimised, and can be loaded directly in the browser. ooml is compatible with most bundling and loader tools.

Directions for compiling ooml.js from source can be found on the [project's README on GitHub](https://github.com/lerouche/ooml).

ooml has no dependencies, and does not require the use of any specific tool or toolchain.

`ooml.js` comes with a built-in HTML parser and compiler. If you are compiling and only need to execute bytecode, you should use [oomlvm](https://ooml.org/oomlvm) instead.
