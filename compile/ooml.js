((Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) => {
  "use strict";

  // Load libooml ooml.js here so only loaded once
  // (can't use zc's importOnce arg due to symlinks)
  __zc_import("../src/ooml.js");
  __zc_import("../../../src/ooml.js");

  // Don't use u_typeof, as $exports may be undefined
  if (typeof exports ==  TYPEOF_OBJECT) {
    module.exports = ooml;
  } else {
    window.ooml = ooml;
  }
})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);
