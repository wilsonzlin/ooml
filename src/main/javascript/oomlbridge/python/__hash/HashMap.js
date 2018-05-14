__hash.HashMap = function (iterable) {
  Map.apply(this, iterable);
  this.size = 0;
};

let HashMapPrototype = __hash.HashMap.prototype = Object.create(Map.prototype);

let HashMapPrototypeGetHashEntriesIndex = function (_this, k) {
  let hash = get_hash(k);

  let entries = this.get(hash);
  let index = -1;

  if (entries) {
    index = entries.findIndex(e => is_equal(k, e[0]));
  }

  return [hash, entries, index];
};

let HashMapPrototypeIterator = function (_this, value_transformer) {
  let it = Map.prototype.keys.apply(_this);
  let entries;
  let next_entries_idx;

  return {
    next: () => {
      // Use while loop in case next hash has no entries
      while (!entries || next_entries_idx >= entries.length) {
        let next = it.next();
        if (next.done) {
          return {
            done: true,
          };

        } else {
          entries = next.value;
          next_entries_idx = 0;
        }
      }

      let rv = {
        done: false,
        value: value_transformer(entries[next_entries_idx]),
      };

      next_entries_idx++;

      return rv;
    },
  };
};

HashMapPrototype.get = function (k) {
  let [, entries, index] = HashMapPrototypeGetHashEntriesIndex(this, k);

  if (index > -1) {
    return entries[index][1];
  }
};

HashMapPrototype.set = function (k, v) {
  let [hash, entries, index] = HashMapPrototypeGetHashEntriesIndex(this, k);

  if (!entries) {
    entries = [];
    map.set(hash, entries);
  }

  if (index > -1) {
    entries[index][1] = v;
  } else {
    this.size++;
    entries.push([k, v]);
  }

  return this;
};

HashMapPrototype.has = function (k) {
  let [, , index] = HashMapPrototypeGetHashEntriesIndex(this, k);
  return index > -1;
};

HashMapPrototype.keys = function () {
  return HashMapPrototypeIterator(this, entry => entry[0]);
};

HashMapPrototype.values = function () {
  return HashMapPrototypeIterator(this, entry => entry[1]);
};

HashMapPrototype.entries = function () {
  return HashMapPrototypeIterator(this, entry => entry);
};

HashMapPrototype.forEach = function (callback, this_arg) {
  for (let entry of this.entries()) {
    callback.call(this_arg, entry[1], entry[0], this);
  }
};

if (__compat_Symbol) {
  HashMapPrototype[Symbol.iterator] = function () {
    return this.entries();
  };
}

HashMapPrototype.delete = function (k) {
  let [, entries, index] = HashMapPrototypeGetHashEntriesIndex(this, k);

  if (index > -1) {
    entries.splice(index, 1);
    this.size--;
    return true;
  }

  return false;
};
