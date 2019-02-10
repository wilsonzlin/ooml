/*
 *  Creates and returns a function that has access to `ooml.o` as `o`,
 *  and when called, executes $raw_code in strict mode.
 *
 *  Does not bind or provide `this` to the outer scope or the function.
 */
let create_ooml_evaluator = raw_code => {
  return eval_and_return_with_ooml(`function(){${raw_code}}`);
};
