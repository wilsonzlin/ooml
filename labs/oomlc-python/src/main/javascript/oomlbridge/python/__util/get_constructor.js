let get_constructor = obj => {
  return is_object(obj) ?
    // This could be null
    Object.getPrototypeOf(obj).constructor :
    undefined;
};
