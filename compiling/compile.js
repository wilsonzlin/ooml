"use strict";

const referenza = require("referenza");

const FLAG_CLEAN = process.argv.slice(2).includes("clean");

const PROJECT_DIR = __dirname + "/../";
const SOURCE_DIR = PROJECT_DIR + "src/";
const INTERMEDIATE_DIR = PROJECT_DIR + "tmp/";
const OUTPUT_DIR = PROJECT_DIR + "dist/";

const STATE_PATH = PROJECT_DIR + "compiling/state.json";

const PROJECT_NAMES = ["ooml"];
const METADATA_FILE_NAME = "__metadata__.js";

const URL_PATH_PREFIX = "/docs";

if (FLAG_CLEAN) {
  console.warn(`====================== CLEAN COMPILE ======================`);
}

referenza.compile({
  clean: FLAG_CLEAN,

  sourceDir: SOURCE_DIR,
  intermediateDir: INTERMEDIATE_DIR,
  outputDir: OUTPUT_DIR,

  statePath: STATE_PATH,

  metadataFileName: METADATA_FILE_NAME,

  feedbackUrl: "https://oomlapi.com/feedback",
  logo: "ooml",

  projectNames: PROJECT_NAMES,

  urlPathPrefix: URL_PATH_PREFIX,
});
