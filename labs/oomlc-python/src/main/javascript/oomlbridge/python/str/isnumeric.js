// regexpu https://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BNumeric_Type%3DNumeric%7D&abb=on&c=on&esc=on&g=&i=

let regex_charset_raw_numeric = "[\\xBC-\\xBE\\u09F4-\\u09F9\\u0B72-\\u0B77\\u0BF0-\\u0BF2\\u0C78-\\u0C7E\\u0D58-\\u0D5E\\u0D70-\\u0D78\\u0F2A-\\u0F33\\u1372-\\u137C\\u16EE-\\u16F0\\u17F0-\\u17F9\\u2150-\\u2182\\u2185-\\u2189\\u2469-\\u2473\\u247D-\\u2487\\u2491-\\u249B\\u24EB-\\u24F4\\u24FE\\u277F\\u2789\\u2793\\u2CFD\\u3007\\u3021-\\u3029\\u3038-\\u303A\\u3192-\\u3195\\u3220-\\u3229\\u3248-\\u324F\\u3251-\\u325F\\u3280-\\u3289\\u32B1-\\u32BF\\u3405\\u3483\\u382A\\u3B4D\\u4E00\\u4E03\\u4E07\\u4E09\\u4E5D\\u4E8C\\u4E94\\u4E96\\u4EBF\\u4EC0\\u4EDF\\u4EE8\\u4F0D\\u4F70\\u5104\\u5146\\u5169\\u516B\\u516D\\u5341\\u5343-\\u5345\\u534C\\u53C1-\\u53C4\\u56DB\\u58F1\\u58F9\\u5E7A\\u5EFE\\u5EFF\\u5F0C-\\u5F0E\\u5F10\\u62FE\\u634C\\u67D2\\u6F06\\u7396\\u767E\\u8086\\u842C\\u8CAE\\u8CB3\\u8D30\\u9621\\u9646\\u964C\\u9678\\u96F6\\uA6E6-\\uA6EF\\uA830-\\uA835\\uF96B\\uF973\\uF978\\uF9B2\\uF9D1\\uF9D3\\uF9FD]|\\uD800[\\uDD07-\\uDD33\\uDD40-\\uDD78\\uDD8A\\uDD8B\\uDEE1-\\uDEFB\\uDF20-\\uDF23\\uDF41\\uDF4A\\uDFD1-\\uDFD5]|\\uD802[\\uDC58-\\uDC5F\\uDC79-\\uDC7F\\uDCA7-\\uDCAF\\uDCFB-\\uDCFF\\uDD16-\\uDD1B\\uDDBC\\uDDBD\\uDDC0-\\uDDCF\\uDDD2-\\uDDFF\\uDE44-\\uDE47\\uDE7D\\uDE7E\\uDE9D-\\uDE9F\\uDEEB-\\uDEEF\\uDF58-\\uDF5F\\uDF78-\\uDF7F\\uDFA9-\\uDFAF]|\\uD803[\\uDCFA-\\uDCFF\\uDE69-\\uDE7E]|\\uD804[\\uDC5B-\\uDC65\\uDDE1-\\uDDF4]|\\uD805[\\uDF3A\\uDF3B]|\\uD806[\\uDCEA-\\uDCF2]|\\uD807[\\uDC5A-\\uDC6C]|\\uD809[\\uDC00-\\uDC6E]|\\uD81A[\\uDF5B-\\uDF61]|\\uD834[\\uDF60-\\uDF71]|\\uD83A[\\uDCC7-\\uDCCF]|\\uD83C[\\uDD0B\\uDD0C]|\\uD840[\\uDC01\\uDC64\\uDCE2\\uDD21]|\\uD842[\\uDD2A\\uDD83\\uDD8C\\uDD9C\\uDEEA\\uDEFD\\uDF19]|\\uD848\\uDF90|\\uD84A\\uDD98|\\uD84E\\uDF1B|\\uD858\\uDE6D|\\uD87E\\uDC90";

let regex_numeric = create_regex_from_charsets([
  regex_charset_raw_decimal,
  regex_charset_raw_digit,
  regex_charset_raw_numeric
]);

str.isnumeric = a => {
  return regex_numeric.test(a);
};
