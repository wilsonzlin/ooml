__hash.HashMap = function (iterable) {
  this.__map = new Map(iterable);
  this.size = 0;
};

let HashMapPrototype = __hash.HashMap.prototype = Object.create(Map.prototype);

let HashMapPrototypeGetHashEntriesIndex = function (__map, k) {
  let hash = get_hash(k);

  let bucket = __map.get(hash);
  let index = -1;

  if (bucket) {
    index = bucket.findIndex(e => py_is_eq(e[0], k));
  }

  return [hash, bucket, index];
};

let HashMapPrototypeIterator = function (__map, value_transformer) {
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

HashMapPrototype.get = function (k) {
  let [, entries, index] = HashMapPrototypeGetHashEntriesIndex(this.__map, k);

  if (index > -1) {
    return entries[index][1];
  }
};

HashMapPrototype.set = function (k, v) {
  let [hash, entries, index] = HashMapPrototypeGetHashEntriesIndex(this.__map, k);

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
  let [, , index] = HashMapPrototypeGetHashEntriesIndex(this.__map, k);
  return index > -1;
};

HashMapPrototype.keys = function () {
  return HashMapPrototypeIterator(this.__map, entry => entry[0]);
};

HashMapPrototype.values = function () {
  return HashMapPrototypeIterator(this.__map, entry => entry[1]);
};

HashMapPrototype.entries = function () {
  return HashMapPrototypeIterator(this.__map, entry => entry);
};

HashMapPrototype.forEach = function (callback, this_arg) {
  iter_consume(this[Symbol.iterator](), entry => {
    callback.call(this_arg, entry[1], entry[0], this);
  });
};

// Don't need to check compatibility; see __compat/Symbol.js
HashMapPrototype[Symbol.iterator] = function () {
  return this.entries();
};

HashMapPrototype.delete = function (k) {
  let [, entries, index] = HashMapPrototypeGetHashEntriesIndex(this.__map, k);

  if (index > -1) {
    entries.splice(index, 1);
    this.size--;
    return true;
  }

  return false;
};
