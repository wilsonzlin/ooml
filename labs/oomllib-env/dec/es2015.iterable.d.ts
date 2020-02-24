/// <reference path="lib.es2015.symbol.d.ts" />

interface WeakMap<K extends object, V> { }

interface WeakMapConstructor {
    new <K extends object, V>(iterable: __Iterable<__Tuple2<K, V>>): WeakMap<K, V>;
}

interface WeakSet<T extends object> { }

interface WeakSetConstructor {
    new <T extends object>(iterable: __Iterable<T>): WeakSet<T>;
}

interface Promise<T> { }

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<TAll>(values: __Iterable<Promise<TAll>>): Promise<TAll[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: __Iterable<Promise<T>>): Promise<T>;
}

interface ArrayBufferView<T extends ArrayBufferView<T>> extends __Iterable<number> {
  /**
   * Returns an array of key, value pairs for every entry in the array
   */
  entries(): __Iterator<__Tuple2<number, number>>;
  /**
   * Returns an list of keys in the array
   */
  keys(): __Iterator<number>;
  /**
   * Returns an list of values in the array
   */
  values(): __Iterator<number>;
}

interface ArrayBufferViewConstructor {
  new (elements: __Iterable<number>): T;
  prototype: ArrayBufferView<T>;

  /**
   * Creates an array from an array-like or iterable object.
   * @param arrayLike An array-like or iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  from<S extends ArrayBufferView<S>>(iterable: __Iterable<number>, mapper?: (v: number, k: number) => number): S;
}

declare const ArrayBufferView : ArrayBufferViewConstructor;
