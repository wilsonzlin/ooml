"use strict";

var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(5088, function () {
    console.log('OOML repo server started on port 5088');
});
