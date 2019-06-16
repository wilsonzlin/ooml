The name given to a property, method, field, class, namespace, module, or group is known as an **identifier**. There are limitations on what an identifier can be.

# Base requirements

An identifier cannot:

- start with two underscores
- end with an underscore
- start with a dollar sign (`$`, ASCII 36)
- start or end with whitespace
- have no characters
- be one of the following:
  - `addDispatchHandler`
  - `addMutationHandler`
  - `constructor`
  - `detach`
  - `dispatch`
  - `hasOwnProperty`
  - `isPrototypeOf`
  - `module`
  - `namespace`
  - `propertyIsEnumerable`
  - `this`
  - `toJSON`
  - `toLocaleString`
  - `toObject`
  - `toString`
  - `valueOf`
  
# Additional field name requirements

In addition to the base requirements, a field name cannot:

- be one of the following:
  - `name`
  - `prototype`
  
# Additional class, namespace, module, and group name requirements

In addition to the base requirements, a class, namespace, module, or group identifier:

- must start with an English alphabet character (i.e. a character from `a` to `z`), lower or upper case
  - this is defined by the regular expression `[a-zA-Z]`
- must only consist of English alphabet and digit (i.e. a character from `0` to `9`) characters
  - this is defined by the regular expression `[a-zA-Z0-9]`
- cannot be:
  - `boolean`
  - `decimal`
  - `integer`
  - `natural`
  - `null`
  - `number`
  - `string`
