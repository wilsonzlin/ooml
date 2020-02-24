// regexpu /^\s+$/u (NOTE: This might not match Python)

let regex_space = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+$/;

str.isspace = a => {
  return regex_space.test(a);
};
