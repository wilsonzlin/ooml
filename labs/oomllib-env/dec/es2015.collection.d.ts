interface WeakMap<K extends object, V> {
    delete(key: K): boolean;
    get(key: K): V | null;
    has(key: K): boolean;
    set(key: K, value: V): WeakMap<K, V>;
}

interface WeakMapConstructor {
    new (): WeakMap<object, any>;
    new <K extends object, V>(entries?: ReadonlyArray<__Tuple2<K, V>> | null): WeakMap<K, V>;
    readonly prototype: WeakMap<object, any>;
}
declare var WeakMap: WeakMapConstructor;

interface WeakSet<T extends object> {
    add(value: T): WeakSet<T>;
    delete(value: T): boolean;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new (): WeakSet<object>;
    new <T extends object>(values?: ReadonlyArray<T> | null): WeakSet<T>;
    readonly prototype: WeakSet<object>;
}
declare var WeakSet: WeakSetConstructor;
