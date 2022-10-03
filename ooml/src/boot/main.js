let boot = () => {
  // Load asynchronously because in IE 9 <body> is still not ready
  __rt_dom_update_async_scheduler(() => {
    let parsed_dom = parse_dom(document.body);

    u_iterate(parsed_dom[0], config => {
      let bc = create_class(config);
      ooml.execute.class(bc);
    });

    u_iterate(parsed_dom[1], config => {
      let bc = create_instantiation(config);
      ooml.execute.instantiation(bc);
    });
  });
};

if (document.readyState != "loading") {
  boot();
} else {
  document.addEventListener("DOMContentLoaded", boot);
}
