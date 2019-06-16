let SV_API_CREATE_FUNCTION_MAP = {
  class: create_class,
  classField: create_class_field,
  classMethod: create_class_method,
  classProperty: create_class_property,
  classView: create_class_view,
  instantiation: create_instantiation,
};

ooml.create = u_new_clean_object();

u_enumerate(SV_API_CREATE_FUNCTION_MAP, (fn, api_name) => {
  ooml.create[api_name] = config => {
    assert_valid_r("configuration", config, valid_object_literal);
    return fn(config);
  };
});
