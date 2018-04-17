let valid_dispatch_event_name = name => {
  return u_typeof(name, TYPEOF_STRING) &&
         /[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z][a-zA-Z0-9]*)*/.test(name);
};
