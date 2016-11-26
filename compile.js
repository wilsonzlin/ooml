const fs = require('fs'),

	  SRC_DIR = __dirname + '/src';

var args = process.argv.slice(2),
	dest = args.find(arg => /^\-o=.+$/.test(arg)),
	debug = args.some(arg => /^debug$/.test(arg));

dest = dest ? dest.slice(3) : __dirname + '/dist';

require('zcompile')({
	src: SRC_DIR,
	dst: dest,

	files: ['ooml.js'],
	debug: debug,
});