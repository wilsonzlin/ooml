const fs = require('fs-extra');
const zc = require('zcompile');
const babel = require('babel-core');

const args = process.argv.slice(2);
const DST_ARG = args.find(arg => /^-o=.+$/.test(arg));
const HARMONY_ARG = args.includes('harmony');

const DEBUG = args.includes('debug');
const SRC_DIR = __dirname + '/tmp/';
const DST_DIR = DST_ARG ? DST_ARG.slice(3) : __dirname + '/dist/';

fs.copySync(__dirname + '/src/', SRC_DIR);

if (HARMONY_ARG) {
    console.warn(`========== HARMONY MODE ==========`);
}

/*
    OPTIMISATION: Create wrapper function and pass in heavily-used globals for scoped usage minification
*/
fs.writeFileSync(
    SRC_DIR + 'ooml.js',

    ['(function(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) {',
        '"use strict";',
        fs.readFileSync(SRC_DIR + 'ooml.js', 'utf8'),
    '})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);'].join('\n')
);

/*
    OPTIMISATION: Remove the "new" keyword from exceptions
*/
fs.readdirSync(SRC_DIR).forEach(file => {
    let without_new_keyword = fs.readFileSync(SRC_DIR + file, 'utf8').replace(/new ((?:Syntax|Type|Reference|Range)?Error)/g, (_, errorClass) => {
        return errorClass;
    });
    fs.writeFileSync(SRC_DIR + file, without_new_keyword);
});

if (!DEBUG) {
    /*
        OPTIMISATION: Make all Utils methods their own functions (i.e. as a variable, not a property)
    */
    let js_utils = Function(fs.readFileSync(SRC_DIR + 'ooml.utils.js', 'utf8').trim() + ';return Utils;')();
    let js_utils_minified = '';
    (function toSingleFunctions(prefix, object) {
        Object.keys(object).forEach(key => {
            let value = object[key];
            if (value.constructor == Function) {
                js_utils_minified += `var ${prefix}${key} = ${value.toString()};\n`;
            } else if (value.constructor == Object) {
                toSingleFunctions(prefix + key + '_', value);
            } else {
                throw new SyntaxError(`Unrecognised property value on Utils object with key "${key}"`);
            }
        });
    })('Utils_', js_utils);
    fs.writeFileSync(SRC_DIR + 'ooml.utils.js', js_utils_minified);

    fs.readdirSync(SRC_DIR).forEach(file => {
        let without_utils_obj = fs.readFileSync(SRC_DIR + file, 'utf8').replace(/Utils(\.(?!apply)[a-zA-Z]+)+/g, str => {
            return str.replace(/\./g, '_');
        });
        fs.writeFileSync(SRC_DIR + file, without_utils_obj);
    });

    let propname_autoincrement;
    let js_propname_constants_minified;

    /*
        OPTIMISATION: Make internal property names shorter
    */
    propname_autoincrement = -1;
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.js', 'utf8').replace(/^(let OOML_[A-Z]+_PROPNAME_[A-Z_]+) = '__[a-zA-Z]+';$/gm, (_, prefix) => {
        return `${prefix} = '__${++propname_autoincrement}';`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.js', js_propname_constants_minified);

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // Use alphabetical characters for NodeSet and StringSet minfied hidden properties
    // as some are just a prefix for combination with another number, causing potential overlap
    // Also, OOML constants use numbers, which might conflict
    propname_autoincrement = -1;
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.NodeSet.js', 'utf8').replace(/'__nodeSet[a-zA-Z]+';$/gm, () => {
        return `'__${ alphabet[++propname_autoincrement] || (() => { throw "Alphabet exceeded" })() }';`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.NodeSet.js', js_propname_constants_minified);

    propname_autoincrement = -1;
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.StringSet.js', 'utf8').replace(/'__stringSet[a-zA-Z]+';$/gm, () => {
        return `'__${ alphabet[++propname_autoincrement] || (() => { throw "Alphabet exceeded" })() }';`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.StringSet.js', js_propname_constants_minified);
}

zc({
    source: SRC_DIR,
    destination: DST_DIR,

    minifyJS: DEBUG ? false : {
        harmony: HARMONY_ARG,
        passes: 3,
    },
    files: ['ooml.js'],

    onloadjs: (code) => {
        if (!HARMONY_ARG) {
            code = babel.transform(code, {
                plugins: [
                    'transform-es2015-block-scoping',
                    'transform-es2015-arrow-functions',
                    'transform-es2015-template-literals',
                    'transform-es2015-destructuring',
                    'transform-es2015-shorthand-properties',
                ]
            }).code.replace(/void 0/g, 'undefined');
        }

        return code;
    },
});

if (!DEBUG) {
    fs.removeSync(SRC_DIR);
}
