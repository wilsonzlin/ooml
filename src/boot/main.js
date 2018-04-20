let boot = () => {
  // Load asynchronously because in IE 9 <body> is still not ready
  __rt_dom_update_async_scheduler(() => {
    let parsed_dom = parse_dom(document.body);

    u_iterate(parsed_dom[0], config => {
      let bc = create_module(config);
      ooml.execute.module(bc);
    });

    u_iterate(parsed_dom[1], config => {
      let bc = create_namespace(config);
      ooml.execute.anonymousNamespace(bc);
    });

    u_iterate(parsed_dom[2], config => {
      let bc = create_class(config);
      ooml.execute.anonymousClass(bc);
    });

    u_iterate(parsed_dom[3], config => {
      let bc = create_instantiation(config);
      ooml.execute.topLevelInstantiation(bc);
    });
  });
};

if (document.readyState != "loading") {
  boot();
} else {
  document.addEventListener("DOMContentLoaded", boot);
}
