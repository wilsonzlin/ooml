let eval_dom_js = $elem => {
  let text = $elem.textContent;
  text = text.trim();
  if (!text) {
    return;
  }
  // WARNING: Text could resolve to undefined, which is the same return value as when !text
  return Function(`"use strict";return ${text}`)();
};
