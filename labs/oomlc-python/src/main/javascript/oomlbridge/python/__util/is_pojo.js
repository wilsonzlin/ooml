// NOTE: Should not detect clean objects (`Object.create(null)`)
let is_pojo = a => {
  return is_object(a) && Object.getPrototypeOf(a) == Object.prototype;
};
