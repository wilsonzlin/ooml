__hash.HashSet = function (iterable) {
  this.__map = new Set(iterable);
  this.size = 0;
};

let HashSetPrototype = __hash.HashSet.prototype = Object.create(Set.prototype);

let HashSetPrototypeGetHashEntriesIndex = function (__map, k) {
  let hash = get_hash(k);

  let bucket = __map.get(hash);
  let index = -1;

  if (bucket) {
    index = bucket.findIndex(e => py_is_eq(e, k));
  }

  return [hash, bucket, index];
};

let HashSetPrototypeIterator = function (__map, value_transformer) {
  let it = __map.keys();
  let bucket;
  let next_bucket_idx;

  return {
    next: () => {
      // Use while loop in case next bucket is empty
      while (!bucket || next_bucket_idx >= bucket.length) {
        let next = it.next();
        if (next.done) {
          return {
            done: true,
          };

        } else {
          bucket = next.value;
          next_bucket_idx = 0;
        }
      }

      let rv = {
        done: false,
        value: value_transformer(bucket[next_bucket_idx]),
      };

      next_bucket_idx++;

      return rv;
    },
  };
};

HashSetPrototype.add = function (k) {
  let [hash, entries, index] = HashSetPrototypeGetHashEntriesIndex(this.__map, k);

  if (!entries) {
    entries = [];
    map.set(hash, entries);
  }

  if (index > -1) {
    entries[index] = k;
  } else {
    this.size++;
    entries.push(k);
  }

  return this;
};

HashSetPrototype.has = function (k) {
  let [, , index] = HashSetPrototypeGetHashEntriesIndex(this.__map, k);
  return index > -1;
};

HashSetPrototype.keys = function () {
  return HashSetPrototypeIterator(this.__map, entry => entry);
};

HashSetPrototype.values = function () {
  return HashSetPrototypeIterator(this.__map, entry => entry);
};

HashSetPrototype.entries = function () {
  return HashSetPrototypeIterator(this.__map, entry => [entry, entry]);
};

HashSetPrototype.forEach = function (callback, this_arg) {
  iter_consume(this[Symbol.iterator](), entry => {
    callback.call(this_arg, entry, entry, this);
  });
};

// Don't need to check compatibility; see __compat/Symbol.js
HashSetPrototype[Symbol.iterator] = function () {
  return this.values();
};

HashSetPrototype.delete = function (k) {
  let [, entries, index] = HashSetPrototypeGetHashEntriesIndex(this.__map, k);

  if (index > -1) {
    entries.splice(index, 1);
    this.size--;
    return true;
  }

  return false;
};
