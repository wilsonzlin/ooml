let valid_dispatch_event_name = name => {
  return u_typeof(name, TYPEOF_STRING) &&
         // Compiled from `/^[^ "'>\/=\p{Cc}]+$/u`, which is the allowed HTML attribute name characters
         /^(?:[!#-&(-.0-<?-~\xA0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+$/.test(name);
};
