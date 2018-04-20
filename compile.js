const fs = require("fs");
const zc = require("zcompile");
const babel = require("babel-core");

const args = process.argv.slice(2);
const DST_ARG = args.find(arg => /^-o=.+$/.test(arg));
const HARMONY_ARG = args.includes("harmony");
const DEBUG_ARG = args.includes("debug");

// Don't put backlash or quotes as then otherwise they need to be specially handled
const IP_MIN_CHARSET_BUILDER = "+!@#$%^&*()_=1234567890-|;:/?.>,<[{]}`~abcdefghijklmnopqrstuvwxyz";
const IP_MIN_CHARSET_OOML = "+!@#$%^&*()_=1234567890-|;:/?.>,<[{]}`~abcdefghijklmnopqrstuvwxyz";
// Use alphabetical characters for NodeSet and StringSet minfied hidden properties
// as some are just a prefix for concatenation with another number, causing potential overlap
// Also, OOML minified property names use numbers, which might conflict
const IP_MIN_CHARSET_NODESET = "ABCDEFGHIJKLMN";
const IP_MIN_CHARSET_STRINGSET = "OPQRSTUVWXYZ";

const dest = DST_ARG ? DST_ARG.slice(3) : __dirname + "/dist/";

class Iterator {
  constructor () {
    this.reset();
  }

  next (charset) {
    if (this.nextPos >= charset.length) {
      throw new Error(`No more characters available`);
    }
    let n = charset[this.nextPos];
    this.nextPos++;
    return n;
  }

  reset () {
    this.nextPos = 0;
  }
}

if (HARMONY_ARG) {
  console.warn(`========== HARMONY MODE ==========`);
}

if (DEBUG_ARG) {
  console.warn(`=========== DEBUG MODE ===========`);
}

zc({
  source: __dirname + "/src",
  destination: dest,

  types: {
    js: {
      minify: DEBUG_ARG ? false : {
        harmony: HARMONY_ARG,
        passes: 3,
      },
      onload: code => {
        if (!DEBUG_ARG) {
          let it = new Iterator();

          // OPTIMISATION: Make internal property names shorter

          code = code
            .replace(/(['"])__Builder([a-zA-Z]+)\1/g, () =>
              `"__${ it.next(IP_MIN_CHARSET_BUILDER) }"`);

          code = code
            .replace(/(['"])__Ooml([a-zA-Z]+)\1/g, () =>
              `"__${ it.next(IP_MIN_CHARSET_OOML) }"`);

          it.reset();
          code = code
            .replace(/(['"])__NodeSet([a-zA-Z]+)\1/g, () =>
              `"__${ it.next(IP_MIN_CHARSET_NODESET) }"`);

          it.reset();
          code = code
            .replace(/(['"])__StringSet([a-zA-Z]+)\1/g, () =>
              `"__${ it.next(IP_MIN_CHARSET_STRINGSET) }"`);
        }

        if (!HARMONY_ARG) {
          code = babel.transform(code, {
            plugins: [
              "transform-es2015-arrow-functions",
              "transform-es2015-block-scoping",
              "transform-es2015-template-literals",
            ]
          }).code.replace(/void 0/g, "undefined");
        }

        return code;
      },
    },
  },

  files: ["ooml.js"],
})
  .catch(err => {
    console.error(err);
  });
