((Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) => {
  "use strict";

  // Load libooml __main__.js here so only loaded once
  // (can't use zc's importOnce arg due to symlinks)
  __zc_import("../src/__main__.js");
  __zc_import("../../../src/__main__.js");

  // Don't use u_typeof, as $exports may be undefined
  if (typeof exports ==  TYPEOF_OBJECT) {
    module.exports = ooml;
  } else {
    window.ooml = ooml;
  }
})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);
