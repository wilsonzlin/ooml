const fs = require('fs-extra');
const zc = require('zcompile');

const ARGS = process.argv.slice(2);
const DST_ARG = ARGS.find(arg => /^\-o=.+$/.test(arg));

const DEBUG = ARGS.some(arg => arg == 'debug');
const SRC_DIR = __dirname + '/tmp/';
const DST_DIR = DST_ARG ? DST_ARG.slice(3) : __dirname + '/dist/';

fs.copySync(__dirname + '/src/', SRC_DIR);

let js_utils = Function(fs.readFileSync(SRC_DIR + 'ooml.utils.js', {encoding: 'utf8'}).trim() + 'return Utils')();
let js_utils_minified = '';
(function toSingleFunctions(prefix, object) {
    Object.keys(object).forEach(function(key) {
        let value = object[key];
        if (value.constructor == Function) {
            js_utils_minified += `var ${prefix}${key} = ${value.toString()};\n`;
        } else if (value.constructor == Object) {
            toSingleFunctions(prefix + key + '_', value);
        } else {
            throw new SyntaxError('Unrecognised property value on Utils object with key ' + key);
        }
    });
})('Utils_', js_utils);
fs.writeFileSync(SRC_DIR + 'ooml.utils.js', js_utils_minified);

fs.readdirSync(SRC_DIR).forEach(file => {
    let without_utils_obj = fs.readFileSync(SRC_DIR + file, {encoding: 'utf8'}).replace(/Utils(\.[a-zA-Z]+)+/g, str => {
        return str.replace(/\./g, '_');
    });
    fs.writeFileSync(SRC_DIR + file, without_utils_obj);
});

let propname_autoincrement = -1;
let js_propname_constants_minified = fs.readFileSync(SRC_DIR + 'ooml.js', {encoding: 'utf8'}).replace(/^([\t ]+(?:var )?OOML_[A-Z]+_PROPNAME_[A-Z_]+) = '__[a-zA-Z]+'([,;])$/gm, (line, prefix, suffix) => {
    return `${prefix} = '__${++propname_autoincrement}'${suffix}`;
});
fs.writeFileSync(SRC_DIR + 'ooml.js', js_propname_constants_minified);

zc({
	src: SRC_DIR,
	dst: DST_DIR,

    debug: DEBUG,
	minifyJS: !DEBUG,
	files: ['ooml.js'],
});

if (!DEBUG) {
    fs.removeSync(SRC_DIR);
}
