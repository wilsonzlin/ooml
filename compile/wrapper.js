((Object, TypeError, SyntaxError, ReferenceError, RangeError, Error, undefined) => {
  "use strict";

  let ooml;
  // Don't use u_typeof, as $exports may be undefined
  if (typeof exports == TYPEOF_OBJECT) {
    ooml = u_new_clean_object();
  } else {
    if (!window.ooml) {
      ooml = window.ooml = u_new_clean_object();
    } else {
      ooml = window.ooml;
    }
  }

  // Load libooml __main__.js here so only loaded once
  // (can't use zc's importOnce arg due to symlinks)
  __zc_import("../src/__main__.js");
  __zc_import("../../../src/__main__.js");
})(Object, TypeError, SyntaxError, ReferenceError, RangeError, Error);
