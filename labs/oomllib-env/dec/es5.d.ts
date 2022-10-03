/////////////////////////////
/// ECMAScript APIs
/////////////////////////////

/**
  * Evaluates JavaScript code and executes it.
  * @param x A String value that contains valid JavaScript code.
  */
declare function eval(x: string): any;

/**
  * Gets the unencoded version of an encoded Uniform Resource Identifier (URI).
  * @param encodedURI A value representing an encoded URI.
  */
declare function decodeURI(encodedURI: string): string;

/**
  * Gets the unencoded version of an encoded component of a Uniform Resource Identifier (URI).
  * @param encodedURIComponent A value representing an encoded URI component.
  */
declare function decodeURIComponent(encodedURIComponent: string): string;

/**
  * Encodes a text string as a valid Uniform Resource Identifier (URI)
  * @param uri A value representing an encoded URI.
  */
declare function encodeURI(uri: string): string;

/**
  * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
  * @param uriComponent A value representing an encoded URI component.
  */
declare function encodeURIComponent(uriComponent: string): string;

/**
  * Computes a new string in which certain characters have been replaced by a hexadecimal escape sequence.
  * @param string A string value
  */
declare function escape(string: string): string;

/**
  * Computes a new string in which hexadecimal escape sequences are replaced with the character that it represents.
  * @param string A string value
  */
declare function unescape(string: string): string;

interface RegExpMatchArray extends Array<string> {
    index?: number;
    input?: string;
}

interface RegExpExecArray extends Array<string> {
    index: number;
    input: string;
}

interface RegExp {
    /**
      * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
      * @param string The String object or string literal on which to perform the search.
      */
    exec(string: string): RegExpExecArray | null;

    /**
      * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
      * @param string String on which to perform the search.
      */
    test(string: string): boolean;

    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    readonly source: string;

    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    readonly global: boolean;

    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    readonly ignoreCase: boolean;

    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    readonly multiline: boolean;

    lastIndex: number;
}

interface RegExpConstructor {
    new(pattern: string | RegExp, flags?: string): RegExp;
    readonly prototype: RegExp;

    // Non-standard extensions
    $1: string;
    $2: string;
    $3: string;
    $4: string;
    $5: string;
    $6: string;
    $7: string;
    $8: string;
    $9: string;
    lastMatch: string;
}

declare const RegExp: RegExpConstructor;

interface Error {
    name: string;
    message: string;
    stack?: string;
}

interface ErrorConstructor {
    new(message?: string): Error;
    readonly prototype: Error;
}

declare const Error: ErrorConstructor;

interface EvalError extends Error {
}

interface EvalErrorConstructor {
    new(message?: string): EvalError;
    readonly prototype: EvalError;
}

declare const EvalError: EvalErrorConstructor;

interface RangeError extends Error {
}

interface RangeErrorConstructor {
    new(message?: string): RangeError;
    readonly prototype: RangeError;
}

declare const RangeError: RangeErrorConstructor;

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor {
    new(message?: string): ReferenceError;
    readonly prototype: ReferenceError;
}

declare const ReferenceError: ReferenceErrorConstructor;

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor {
    new(message?: string): SyntaxError;
    readonly prototype: SyntaxError;
}

declare const SyntaxError: SyntaxErrorConstructor;

interface TypeError extends Error {
}

interface TypeErrorConstructor {
    new(message?: string): TypeError;
    readonly prototype: TypeError;
}

declare const TypeError: TypeErrorConstructor;

interface URIError extends Error {
}

interface URIErrorConstructor {
    new(message?: string): URIError;
    readonly prototype: URIError;
}

declare const URIError: URIErrorConstructor;

interface JSON {
    /**
      * Converts a JavaScript Object Notation (JSON) string into an object.
      * @param text A valid JSON string.
      * @param reviver A function that transforms the results. This function is called for each member of the object.
      * If a member contains nested objects, the nested objects are transformed before the parent object is.
      */
    parse(text: string, reviver?: (key: any, value: any) => any): any;
    /**
      * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
      * @param value A JavaScript value, usually an object or array, to be converted.
      * @param replacer A function that transforms the results.
      * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
      */
    stringify(value: any, replacer?: ((key: string, value: any) => any) | string[], space?: string | number): string;
}

/**
  * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
  */
declare const JSON: JSON;

interface PromiseHandler<T, R> {
  (result: T): Promise<R> | null;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<R>(onfulfilled?: PromiseHandler<T, R>): Promise<R>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<R>(onrejected?: PromiseHandler<any, R>): Promise<R>;
}

interface IterationConsumer<K, V, T> {
  (value: V, index: K, array: T): void;
}

/**
  * Represents a raw buffer of binary data, which is used to store data for the
  * different typed arrays. ArrayBuffers cannot be read from or written to directly,
  * but can be passed to a typed array or DataView Object to interpret the raw
  * buffer as needed.
  */
 interface ArrayBuffer {
  /**
    * Read-only. The length of the ArrayBuffer (in bytes).
    */
  readonly byteLength: number;

  /**
    * Returns a section of an ArrayBuffer.
    */
  slice(begin: number, end?: number): ArrayBuffer;
}

interface ArrayBufferConstructor {
  readonly prototype: ArrayBuffer;
  new(byteLength: number): ArrayBuffer;
}
declare const ArrayBuffer: ArrayBufferConstructor;

interface ArrayBufferView<T extends ArrayBufferView<T>> {
  /**
    * The ArrayBuffer instance referenced by the array.
    */
  readonly buffer: ArrayBuffer;

  /**
    * The length in bytes of the array.
    */
  readonly byteLength: number;

  /**
    * The offset in bytes of the array.
    */
  readonly byteOffset: number;
}

interface DataView extends ArrayBufferView<DataView> {
  /**
    * Gets the Float32 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getFloat32(byteOffset: number, littleEndian?: boolean): number;

  /**
    * Gets the Float64 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getFloat64(byteOffset: number, littleEndian?: boolean): number;

  /**
    * Gets the Int8 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getInt8(byteOffset: number): number;

  /**
    * Gets the Int16 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getInt16(byteOffset: number, littleEndian?: boolean): number;
  /**
    * Gets the Int32 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getInt32(byteOffset: number, littleEndian?: boolean): number;

  /**
    * Gets the Uint8 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getUint8(byteOffset: number): number;

  /**
    * Gets the Uint16 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getUint16(byteOffset: number, littleEndian?: boolean): number;

  /**
    * Gets the Uint32 value at the specified byte offset from the start of the view. There is
    * no alignment constraint; multi-byte values may be fetched from any offset.
    * @param byteOffset The place in the buffer at which the value should be retrieved.
    */
  getUint32(byteOffset: number, littleEndian?: boolean): number;

  /**
    * Stores an Float32 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
    * Stores an Float64 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
    * Stores an Int8 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    */
  setInt8(byteOffset: number, value: number): void;

  /**
    * Stores an Int16 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
    * Stores an Int32 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
    * Stores an Uint8 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    */
  setUint8(byteOffset: number, value: number): void;

  /**
    * Stores an Uint16 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

  /**
    * Stores an Uint32 value at the specified byte offset from the start of the view.
    * @param byteOffset The place in the buffer at which the value should be set.
    * @param value The value to set.
    * @param littleEndian If false or undefined, a big-endian value should be written,
    * otherwise a little-endian value should be written.
    */
  setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
}

interface DataViewConstructor {
  new(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): DataView;
}
declare const DataView: DataViewConstructor;

interface TypedArrayIterationCallback<T, R> {
  (value: number, index: number, array: T): R;
}

interface TypedArrayIterationConsumer<T> extends IterationConsumer<number, number, T> /*! @ooml-interface */ {
}

interface TypedArrayIterationReducer<T, U> {
  (previous: U, current: number, index: number, array: T): U;
}

interface TypedArray<T extends TypedArray<T>> extends ArrayBufferView<T> {
  /**
      * Returns the this object after copying a section of the array identified by start and end
      * to the same array starting at position target
      * @param target If target is negative, it is treated as length+target where length is the
      * length of the array.
      * @param start If start is negative, it is treated as length+start. If end is negative, it
      * is treated as length+end.
      * @param end If not specified, length of the this object is used as its default value.
      */
     copyWithin(target: number, start: number, end?: number): T;

     /**
       * Determines whether all the members of an array satisfy the specified test.
       * @param callback A function that accepts up to three arguments. The every method calls
       * the callback function for each element in array1 until the callback returns false,
       * or until the end of the array.
       * @param thisArg An object to which the this keyword can refer in the callback function.
       * If thisArg is omitted, undefined is used as the this value.
       */
     every(callback: TypedArrayIterationCallback<T, boolean>): boolean;

     /**
         * Returns the this object after filling the section identified by start and end with value
         * @param value value to fill array section with
         * @param start index to start filling the array at. If start is negative, it is treated as
         * length+start where length is the length of the array.
         * @param end index to stop filling the array at. If end is negative, it is treated as
         * length+end.
         */
     fill(value: number, start?: number, end?: number): T;

     /**
       * Returns the elements of an array that meet the condition specified in a callback function.
       * @param callback A function that accepts up to three arguments. The filter method calls
       * the callback function one time for each element in the array.
       * @param thisArg An object to which the this keyword can refer in the callback function.
       * If thisArg is omitted, undefined is used as the this value.
       */
     filter(callback: TypedArrayIterationCallback<T, boolean>): T;

     /**
       * Returns the value of the first element in the array where predicate is true, and undefined
       * otherwise.
       * @param predicate find calls predicate once for each element of the array, in ascending
       * order, until it finds one where predicate returns true. If such an element is found, find
       * immediately returns that element value. Otherwise, find returns undefined.
       * @param thisArg If provided, it will be used as the this value for each invocation of
       * predicate. If it is not provided, undefined is used instead.
       */
     find(predicate: TypedArrayIterationCallback<T, boolean>): number | null;

     /**
       * Returns the index of the first element in the array where predicate is true, and -1
       * otherwise.
       * @param predicate find calls predicate once for each element of the array, in ascending
       * order, until it finds one where predicate returns true. If such an element is found,
       * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
       * @param thisArg If provided, it will be used as the this value for each invocation of
       * predicate. If it is not provided, undefined is used instead.
       */
     findIndex(predicate: TypedArrayIterationCallback<T, boolean>): number;

     /**
       * Performs the specified action for each element in an array.
       * @param callback  A function that accepts up to three arguments. forEach calls the
       * callback function one time for each element in the array.
       * @param thisArg  An object to which the this keyword can refer in the callback function.
       * If thisArg is omitted, undefined is used as the this value.
       */
     forEach(callback: TypedArrayIterationConsumer<T>): void;

     /**
       * Returns the index of the first occurrence of a value in an array.
       * @param searchElement The value to locate in the array.
       * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
       *  search starts at index 0.
       */
     indexOf(searchElement: number, fromIndex?: number): number;

     /**
       * Adds all the elements of an array separated by the specified separator string.
       * @param separator A string used to separate one element of an array from the next in the
       * resulting String. If omitted, the array elements are separated with a comma.
       */
     join(separator?: string): string;

     /**
       * Returns the index of the last occurrence of a value in an array.
       * @param searchElement The value to locate in the array.
       * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
       * search starts at index 0.
       */
     lastIndexOf(searchElement: number, fromIndex?: number): number;

     /**
       * The length of the array.
       */
     readonly length: number;

     /**
       * Calls a defined callback function on each element of an array, and returns an array that
       * contains the results.
       * @param callback A function that accepts up to three arguments. The map method calls the
       * callback function one time for each element in the array.
       * @param thisArg An object to which the this keyword can refer in the callback function.
       * If thisArg is omitted, undefined is used as the this value.
       */
     map(callback: TypedArrayIterationCallback<T, number>): T;

     /**
       * Calls the specified callback function for all the elements in an array. The return value of
       * the callback function is the accumulated result, and is provided as an argument in the next
       * call to the callback function.
       * @param callback A function that accepts up to four arguments. The reduce method calls the
       * callback function one time for each element in the array.
       * @param initialValue If initialValue is specified, it is used as the initial value to start
       * the accumulation. The first call to the callback function provides this value as an argument
       * instead of an array value.
       */
     reduce<U>(callback: TypedArrayIterationReducer<T, U>, initialValue?: U): U;

     /**
       * Calls the specified callback function for all the elements in an array, in descending order.
       * The return value of the callback function is the accumulated result, and is provided as an
       * argument in the next call to the callback function.
       * @param callback A function that accepts up to four arguments. The reduceRight method calls
       * the callback function one time for each element in the array.
       * @param initialValue If initialValue is specified, it is used as the initial value to start
       * the accumulation. The first call to the callback function provides this value as an argument
       * instead of an array value.
       */
     reduceRight<U>(callback: TypedArrayIterationReducer<T, U>, initialValue?: U): U;

     /**
       * Reverses the elements in an Array.
       */
     reverse(): T;

     /**
       * Sets a value or an array of values.
       * @param array A typed or untyped array of values to set.
       * @param offset The index in the current array at which the values are to be written.
       */
     set(array: Array<number>, offset?: number): void;

     /**
       * Returns a section of an array.
       * @param start The beginning of the specified portion of the array.
       * @param end The end of the specified portion of the array.
       */
     slice(start?: number, end?: number): T;

     /**
       * Determines whether the specified callback function returns true for any element of an array.
       * @param callback A function that accepts up to three arguments. The some method calls the
       * callback function for each element in array1 until the callback returns true, or until
       * the end of the array.
       * @param thisArg An object to which the this keyword can refer in the callback function.
       * If thisArg is omitted, undefined is used as the this value.
       */
     some(callback: TypedArrayIterationCallback<T, boolean>): boolean;

     /**
       * Sorts an array.
       * @param compareFn The name of the function used to determine the order of the elements. If
       * omitted, the elements are sorted in ascending, ASCII character order.
       */
     sort(comparator?: (a: number, b: number) => number): T;

     /**
       * Gets a new T view of the ArrayBuffer store for this array, referencing the elements
       * at begin, inclusive, up to end, exclusive.
       * @param begin The index of the beginning of the array.
       * @param end The index of the end of the array.
       */
     subarray(begin: number, end?: number): T;

     /**
       * Converts a number to a string by using the current locale.
       */
     toLocaleString(): string;

     /**
       * Returns a string representation of an array.
       */
     toString(): string;

     [index: number]: number;
}

interface TypedArrayConstructor {
  readonly prototype: TypedArray;
  new(length: number): T;
  new(arrayOrArrayBuffer: Array<number> | ArrayBuffer): T;
  new(buffer: ArrayBuffer, byteOffset: number, length?: number): T;

  /**
    * Returns a new array from a set of elements.
    * @param items A set of elements to include in the new array object.
    */
  of<S extends TypedArray<S>>(...items: number[]): S;

  /**
    * Creates an array from an array-like or iterable object.
    * @param arrayLike An array-like or iterable object to convert to an array.
    * @param mapfn A mapping function to call on every element of the array.
    * @param thisArg Value of 'this' used to invoke the mapfn.
    */
  from<S extends TypedArray<S>>(arrayLike: Array<number>, mapfn?: (v: number, k: number) => number): S;
}
declare const TypedArray: TypedArrayConstructor;

/**
* A typed array of 8-bit integer values. The contents are initialized to 0. If the requested
* number of bytes could not be allocated an exception is raised.
*/
interface Int8Array extends TypedArray<Int8Array> {
}

interface Int8ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Int8Array: Int8ArrayConstructor;

/**
* A typed array of 8-bit unsigned integer values. The contents are initialized to 0. If the
* requested number of bytes could not be allocated an exception is raised.
*/
interface Uint8Array extends TypedArray<Uint8Array> {
}

interface Uint8ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Uint8Array: Uint8ArrayConstructor;

/**
* A typed array of 8-bit unsigned integer (clamped) values. The contents are initialized to 0.
* If the requested number of bytes could not be allocated an exception is raised.
*/
interface Uint8ClampedArray extends TypedArray<Uint8ClampedArray> {}

interface Uint8ClampedArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Uint8ClampedArray: Uint8ClampedArrayConstructor;

/**
* A typed array of 16-bit signed integer values. The contents are initialized to 0. If the
* requested number of bytes could not be allocated an exception is raised.
*/
interface Int16Array extends TypedArray<Int16Array> {}

interface Int16ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Int16Array: Int16ArrayConstructor;

/**
* A typed array of 16-bit unsigned integer values. The contents are initialized to 0. If the
* requested number of bytes could not be allocated an exception is raised.
*/
interface Uint16Array extends TypedArray<Uint16Array> {}

interface Uint16ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Uint16Array: Uint16ArrayConstructor;
/**
* A typed array of 32-bit signed integer values. The contents are initialized to 0. If the
* requested number of bytes could not be allocated an exception is raised.
*/
interface Int32Array extends TypedArray<Int32Array> {
}

interface Int32ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Int32Array: Int32ArrayConstructor;

/**
* A typed array of 32-bit unsigned integer values. The contents are initialized to 0. If the
* requested number of bytes could not be allocated an exception is raised.
*/
interface Uint32Array extends TypedArray<Uint32Array> {
}

interface Uint32ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
  readonly BYTES_PER_ELEMENT: number;
}
declare const Uint32Array: Uint32ArrayConstructor;

/**
* A typed array of 32-bit float values. The contents are initialized to 0. If the requested number
* of bytes could not be allocated an exception is raised.
*/
interface Float32Array extends TypedArray<Float32Array> {
}

interface Float32ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
   readonly BYTES_PER_ELEMENT: number;
}
declare const Float32Array: Float32ArrayConstructor;

/**
* A typed array of 64-bit float values. The contents are initialized to 0. If the requested
* number of bytes could not be allocated an exception is raised.
*/
interface Float64Array extends TypedArray<Float64Array> {
}

interface Float64ArrayConstructor {
  /**
    * The size in bytes of each element in the array.
    */
   readonly BYTES_PER_ELEMENT: number;
}
declare const Float64Array: Float64ArrayConstructor;

/////////////////////////////
/// ECMAScript Internationalization API
/////////////////////////////

declare namespace Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }

    interface ResolvedCollatorOptions {
        locale: string;
        usage: string;
        sensitivity: string;
        ignorePunctuation: boolean;
        collation: string;
        caseFirst: string;
        numeric: boolean;
    }

    interface Collator {
        compare(x: string, y: string): number;
        resolvedOptions(): ResolvedCollatorOptions;
    }
    var Collator: {
        new(locales?: string | string[], options?: CollatorOptions): Collator;
        supportedLocalesOf(locales: string | string[], options?: CollatorOptions): string[];
    };

    interface NumberFormatOptions {
        localeMatcher?: string;
        style?: string;
        currency?: string;
        currencyDisplay?: string;
        useGrouping?: boolean;
        minimumIntegerDigits?: number;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
    }

    interface ResolvedNumberFormatOptions {
        locale: string;
        numberingSystem: string;
        style: string;
        currency?: string;
        currencyDisplay?: string;
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
        useGrouping: boolean;
    }

    interface NumberFormat {
        format(value: number): string;
        resolvedOptions(): ResolvedNumberFormatOptions;
    }
    var NumberFormat: {
        new(locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
        supportedLocalesOf(locales: string | string[], options?: NumberFormatOptions): string[];
    };
}
