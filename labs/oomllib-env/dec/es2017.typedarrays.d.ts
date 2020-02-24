interface ArrayBufferViewConstructor {
    new (): T;
    prototype: ArrayBufferView<T>;
}

declare const ArrayBufferView : ArrayBufferViewConstructor;
