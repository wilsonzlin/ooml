let stream_substitution_parts = (text_content, on_lit, on_sub) => {
  let cur_pos = 0;
  let brace_open_pos;
  let brace_close_pos;
  while ((brace_open_pos = text_content.indexOf("{{", cur_pos)) > -1) {
    if (brace_open_pos > cur_pos) {
      let before_brace = text_content.slice(cur_pos, brace_open_pos);
      on_lit(before_brace);
    }

    brace_close_pos = text_content.indexOf("}}", brace_open_pos + 2);
    if (brace_close_pos == -1) {
      throw SyntaxError(`Missing closing braces for substitution`);
    }

    let prop = text_content.slice(brace_open_pos + 2, brace_close_pos).trim();
    on_sub(prop);

    cur_pos = brace_close_pos + 2;
  }

  if (cur_pos < text_content.length) {
    on_lit(text_content.slice(cur_pos));
  }
};
