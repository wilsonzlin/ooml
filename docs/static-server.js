"use strict";

const referenza = require("referenza");

referenza.serve({
  port: 3072,
  outputDir: __dirname + "/dist",
  prefix: "/docs",
});
