let u_eval_js = text => {
  return Function(`"use strict";return (${text})`)();
};
