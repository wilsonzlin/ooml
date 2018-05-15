let py_iterate = (iterable, callback) => {
  let obj = is_object(iterable);
  let length;

  if (is_map(iterable) || is_set(iterable)) {
    // Check before Symbol.iterator as yielded values from iterators
    // for builtins differ between Python and JS
    // `keys` works for Set instances too
    consume_iterator(iterable.keys(), callback);

  } else if (iterable[Symbol.iterator]) {
    // This works for JS builtins and libraries if Symbol is supported,
    // and for any AIL iterable even if Symbol isn't supported (see __compat/Symbol)
    let iterator = iterable[Symbol.iterator]();
    consume_iterator(iterator, callback);

  } else if (obj && is_number(length = iterable.length)) {
    // NOTE: This should only be for JS builtins (if Symbol is not supported)
    // and old JS libraries
    // AIL dictates that `.length` must be a function
    for (let i = 0; i < length; i++) {
      callback(iterable[i], i, iterable);
    }

  } else if (obj && is_function(iterable.get)) {
    // Python-specific behaviour: if no `iterator`, just try `get` with non-zero integers
    // until `IndexError` or `StopIteration` (no, don't check if has length or use it as bound)
    let i = 0;
    while (true) {
      let v;
      try {
        v = iterable.get(i);
      } catch (e) {
        if (is_instance(StopIteration, e) || is_instance(IndexError, e)) {
          break;
        }
        throw e;
      }
      callback(v);
      i++;
    }

  } else {
    throw TypeError(`Not iterable`);
  }
};
