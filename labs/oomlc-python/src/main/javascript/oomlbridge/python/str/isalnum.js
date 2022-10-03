let regex_alnum = create_regex_from_charsets([
  regex_charset_raw_alpha,
  regex_charset_raw_digit,
  regex_charset_raw_decimal,
  regex_charset_raw_numeric,
]);

str.isalnum = a => {
  return regex_alnum.test(a);
};
