// This creates a JS iterator from something that Python would consider iterable
let py_create_iterator = py_iterable => {
  let obj = is_object(py_iterable) && !is_function(py_iterable); // Functions have .length
  let length;

  if (is_map(py_iterable) || is_set(py_iterable)) {
    // Check before Symbol.iterator as yielded values from iterators for builtins
    // differ between Python and JS
    // `keys` works for Set instances too
    return py_iterable.keys();

  } else if (py_iterable[Symbol.iterator]) {
    // This works for JS builtins and libraries if Symbol is supported,
    // and for any AIL iterable even if Symbol isn't supported (see __compat/Symbol)
    return iter_wrap(py_iterable[Symbol.iterator]());

  } else if (obj && is_number(length = py_iterable.length)) {
    // NOTE: This should only be for JS builtins (if Symbol is not supported)
    // and old JS libraries
    // AIL dictates that `.length` must be a function
    let i = 0;
    return {
      next: () => {
        if (i >= length) {
          return {
            done: true,
          };
        }
        let rv = {
          done: false,
          value: py_iterable[i],
        };
        i++;
        return rv;
      }
    };

  } else if (obj && is_function(py_iterable.get)) {
    // Python-specific behaviour: if no `iterator`, just try `get` with non-zero integers
    // until `IndexError` or `StopIteration` (no, don't check if has length or use it as bound)
    let i = 0;
    return {
      next: () => {
        let v;
        try {
          v = py_iterable.get(i);
        } catch (e) {
          if (is_instance(StopIteration, e) || is_instance(IndexError, e)) {
            return {
              done: true,
            };
          }
          throw e;
        }
        let rv = {
          done: false,
          value: v,
        };
        i++;
        return rv;
      }
    };

  } else {
    throw TypeError(`Not iterable`);
  }
};
