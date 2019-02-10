/*
 *  Evaluates a JS expression, NOT one or more statements, in strict mode,
 *  providing `ooml.o` as `o` and $this_val as `this`.
 *
 *  Intentially returns whatever the result is.
 */
let eval_and_return_with_ooml = (raw_expr, this_val) => {
  return eval_with_ooml(`return(${raw_expr})`, this_val);
};
