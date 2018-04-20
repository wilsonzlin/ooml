let traverse_dom_path = (root, path) => {
  let cur = root;
  u_iterate(path, component => {
    cur = cur.childNodes[component];
  });
  return cur;
};
