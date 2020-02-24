let create_regex_from_charsets = charsets => {
  return RegExp("^(?:" + charsets.join("|") + ")+$");
};
