let create_class_view = view => {
  let builder = new ClassViewBuilder();

  builder.setRoot(view);

  return builder;
};
