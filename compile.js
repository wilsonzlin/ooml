const fs = require("fs");
const Path = require("path");
const zc = require("zcompile");
const babel = require("babel-core");

const args = process.argv.slice(2);
const DST_ARG = args.find(arg => /^-o=.+$/.test(arg));
const HARMONY_ARG = args.includes("es6");
const DEBUG_ARG = args.includes("debug");

// Don't put backlash or quotes as then otherwise they need to be specially handled
const PROPNAME_MIN_CHARSET_OOML = "+!@#$%^&*()_=1234567890-|;:/?.>,<[{]}`~abcdefghijklmnopqrstuvwxyz";
// Use alphabetical characters for NodeSet and StringSet minfied hidden properties
// as some are just a prefix for concatenation with another number, causing potential overlap
// Also, OOML minified property names use numbers, which might conflict
const PROPNAME_MIN_CHARSET_NODESET = "ABCDEFGHIJKLMN";
const PROPNAME_MIN_CHARSET_STRINGSET = "OPQRSTUVWXYZ";

const dest = DST_ARG ? DST_ARG.slice(3) : __dirname + "/dist/";

class Iterator {
  constructor() {
    this.reset();
  }

  next(charset) {
    if (this.nextPos >= charset.length) {
      throw new Error(`No more characters available`);
    }
    let n = charset[this.nextPos];
    this.nextPos++;
    return n;
  }

  reset() {
    this.nextPos = 0;
  }
}

if (HARMONY_ARG) {
  console.warn(`========== HARMONY MODE ==========`);
}

zc({
  source: __dirname + "/src",
  destination: dest,

  minifyJS: DEBUG_ARG ? false : {
    harmony: HARMONY_ARG,
    passes: 3,
  },
  files: ["ooml.js"],

  onloadjs: code => {
    if (!HARMONY_ARG) {
      return babel.transform(code, {
        plugins: [
          "transform-es2015-arrow-functions",
          "transform-es2015-block-scoping",
          "transform-es2015-template-literals",
        ]
      }).code.replace(/void 0/g, "undefined");
    }
  },
})
  .then(() => {
    let code = fs.readFileSync(Path.join(dest, "ooml.js"), "utf8");

    if (!DEBUG_ARG) {
      let it = new Iterator();

      // OPTIMISATION: Make internal property names shorter
      propname_autoincrement = -1;
      code = code
        .replace(/(['"])__ooml([a-zA-Z]+)\1/g, () =>
          `"__${ it.next(PROPNAME_MIN_CHARSET_OOML) }";`);

      propname_autoincrement = -1;
      code = code
        .replace(/(['"])__nodeSet([a-zA-Z]+)\1/g, () =>
          `"__${ it.next(PROPNAME_MIN_CHARSET_NODESET) }"`);

      propname_autoincrement = -1;
      code = code
        .replace(/(['"])__stringSet([a-zA-Z]+)\1/g, () =>
          `"__${ it.next(PROPNAME_MIN_CHARSET_STRINGSET) }"`);

      fs.writeFileSync(Path.join(dest, "ooml.js"), code);
    }
  })
  .catch(err => {
    console.error(err);
  });
