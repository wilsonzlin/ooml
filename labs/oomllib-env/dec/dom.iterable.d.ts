/// <reference path="lib.dom.d.ts" />

interface DOMTokenList extends __Iterable<string> {
}

interface Headers extends __Iterable<__Tuple2<string, string>> {
    /**
     * Returns an iterator allowing to go through all key/value pairs contained in this object.
     */
    entries(): __Iterator<__Tuple2<string, string>>;
    /**
     * Returns an iterator allowing to go through all keys f the key/value pairs contained in this object.
     */
    keys(): __Iterator<string>;
    /**
     * Returns an iterator allowing to go through all values of the key/value pairs contained in this object.
     */
    values(): __Iterator<string>;
}

interface NodeList<T extends Node> extends __Iterable<T> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): __Iterator<__Tuple2<number, T>>;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callback: IterationConsumer<number, T, NodeList<T>>): void;
    /**
     * Returns an list of keys in the list
     */
    keys(): __Iterator<number>;

    /**
     * Returns an list of values in the list
     */
    values(): __Iterator<T>;
}

interface HTMLCollection<T extends Element> extends __Iterable<T> {
}

interface FormData extends __Iterable<string | File> {
    /**
     * Returns an array of key, value pairs for every entry in the list
     */
    entries(): __Iterator<__Tuple2<string, string | File>>;
    /**
     * Returns a list of keys in the list
     */
    keys(): __Iterator<string>;
    /**
     * Returns a list of values in the list
     */
    values(): __Iterator<string | File>;
}

interface URLSearchParams extends __Iterable<__Tuple2<string, string>> {
    /**
     * Returns an array of key, value pairs for every entry in the search params
     */
    entries(): __Iterator<__Tuple2<string, string>>;
    /**
     * Returns a list of keys in the search params
     */
    keys(): __Iterator<string>;
    /**
     * Returns a list of values in the search params
     */
    values(): __Iterator<string>;
}
