let get_prop = (obj, prop) => {
  return is_object(obj) ?
    obj[prop] :
    undefined;
};
