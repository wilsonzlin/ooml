"use strict";

const zcompile = require("zcompile");
const babel = require("babel-core");

zcompile({
  source: __dirname + "/../src/",
  destination: __dirname + "/../dist",

  types: {
    js: {
      harmony: true,
      onload: code => {
        code = babel.transform(code, {
          plugins: [
            "transform-es2015-arrow-functions",
            "transform-es2015-block-scoping",
            "transform-es2015-destructuring",
            "transform-es2015-template-literals",
          ],
        }).code.replace(/void 0/g, "undefined");

        return code;
      }
    },
  },

  files: [
    {
      source: "main/javascript/oomlbridge/python/__main__.js",
      destination: "oomlpy.js",
    },
  ],
})
  .catch(console.error);
