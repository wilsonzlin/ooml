let push_all = (target, elems) => {
  target.push.apply(target, elems);
  return target;
};
