const fs = require('fs-extra');
const zc = require('zcompile');
const babel = require('babel-core');

const args = process.argv.slice(2);
const DST_ARG = args.find(arg => /^-o=.+$/.test(arg));
const HARMONY_ARG = args.includes('harmony');
const NANO_ARG = args.includes('nano');

const DEBUG = args.includes('debug');
const SRC_DIR = __dirname + '/tmp/';
const DST_DIR = DST_ARG ? DST_ARG.slice(3) : __dirname + '/dist/';

fs.copySync(__dirname + '/src/', SRC_DIR);

if (NANO_ARG) {
    console.warn(`========== NANO MODE ==========`);
}
if (HARMONY_ARG) {
    console.warn(`========== HARMONY MODE ==========`);
}

/*
    OPTIMISATION: Create wrapper function and pass in heavily-used globals for scoped usage minification
*/
if (NANO_ARG) {
    fs.writeFileSync(
        SRC_DIR + 'ooml.js',

        '(function(Object, undefined) {' +
            fs.readFileSync(SRC_DIR + 'ooml.js', 'utf8') +
        '})(Object)'
    );
} else {
    fs.writeFileSync(
        SRC_DIR + 'ooml.js',

        '(function(Object, TypeError, SyntaxError, undefined) {' +
            fs.readFileSync(SRC_DIR + 'ooml.js', 'utf8') +
        '})(Object, TypeError, SyntaxError)'
    );
}

if (!NANO_ARG) {
    /*
        OPTIMISATION: Remove the "new" keyword from exceptions
    */
    fs.readdirSync(SRC_DIR).forEach(file => {
        let without_new_keyword = fs.readFileSync(SRC_DIR + file, 'utf8').replace(/new ((?:Syntax|Type|Reference)?Error)/g, (_, errorClass) => {
            return errorClass;
        });
        fs.writeFileSync(SRC_DIR + file, without_new_keyword);
    });
}

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
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.js', 'utf8').replace(/^([\t ]+(?:var )?OOML_[A-Z]+_PROPNAME_[A-Z_]+) = '__[a-zA-Z]+'([,;])$/gm, (line, prefix, suffix) => {
        return `${prefix} = '__${++propname_autoincrement}'${suffix}`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.js', js_propname_constants_minified);

    propname_autoincrement = -1;
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.NodeSet.js', 'utf8').replace(/'__nodeSet[a-zA-Z]+';$/gm, () => {
        return `'__${++propname_autoincrement}';`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.NodeSet.js', js_propname_constants_minified);

    propname_autoincrement = -1;
    js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.StringSet.js', 'utf8').replace(/'__stringSet[a-zA-Z]+';$/gm, () => {
        return `'__${++propname_autoincrement}';`;
    });
    fs.writeFileSync(SRC_DIR + 'ooml.StringSet.js', js_propname_constants_minified);
}

let nano_js_exceptions = [];

zc({
    src: SRC_DIR,
    dst: DST_DIR,

    minifyJS: DEBUG ? false : {
        harmony: HARMONY_ARG,
        passes: 3,
    },
    files: ['ooml.js'],

    onloadfile: (code) => {
        if (NANO_ARG) {
            code = code.replace(/new [A-Za-z]+Error\(`(.+?)`\)/g, (line, errorMessage) => {
                return nano_js_exceptions.push(errorMessage) - 1;
            });
        }

        if (!HARMONY_ARG) {
            code = babel.transform(code, {
                plugins: [
                    'transform-es2015-block-scoping',
                    'transform-es2015-arrow-functions',
                    'transform-es2015-template-literals',
                ]
            }).code;
        }

        return code;
    },
});

if (NANO_ARG) {
    fs.writeFileSync(DST_DIR + 'ooml.nano.exceptions.json', JSON.stringify(nano_js_exceptions));
    fs.copySync(DST_DIR + 'ooml.js', DST_DIR + 'ooml.nano.js');
    fs.removeSync(DST_DIR + 'ooml.js');
} else {
    fs.removeSync(DST_DIR + 'ooml.nano.exceptions.json');
    fs.removeSync(DST_DIR + 'ooml.nano.js');
}

if (!DEBUG) {
    fs.removeSync(SRC_DIR);
}
