/*
 *  Evaluates a block of JS code, which may contain multiple statements,
 *  providing `ooml.o` as `o` and $this_val as `this`.
 *
 *  The code is executed in strict mode.
 *
 *  Returns whatever the result is, but does not intentionally return
 *  anything.
 */
let eval_with_ooml = (raw_code, this_val) => {
  return Function("o", `"use strict";${raw_code}`).call(this_val, o);
};
