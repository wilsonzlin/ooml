// regexpu https://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BNumeric_Type%3DDigit%7D&abb=on&c=on&esc=on&g=&i=

let regex_charset_raw_digit = "[\\xB2\\xB3\\xB9\\u1369-\\u1371\\u19DA\\u2070\\u2074-\\u2079\\u2080-\\u2089\\u2460-\\u2468\\u2474-\\u247C\\u2488-\\u2490\\u24EA\\u24F5-\\u24FD\\u24FF\\u2776-\\u277E\\u2780-\\u2788\\u278A-\\u2792]|\\uD802[\\uDE40-\\uDE43]|\\uD803[\\uDE60-\\uDE68]|\\uD804[\\uDC52-\\uDC5A]|\\uD83C[\\uDD00-\\uDD0A]";

let regex_digit = create_regex_from_charsets([regex_charset_raw_decimal, regex_charset_raw_digit]);

str.isdigit = a => {
  return regex_digit.test(a);
};
