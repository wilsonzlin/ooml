# Normalising types

TypeScript can have very complex types which can be near impossible to transpile to other languages. However, most can fit into a standard category, which can be transpiled in a specific way.

## Before categorising

If it's a union type and contains `null` or `undefined`, remove them and mark the type as optional. If there is only one subtype remaining, unwrap it. If there are no subtypes remaining, throw an exception.

|From|To|
|---|---|
|`string | null | undefined`|`Optional<string>`|
|`string | number | null`|`Optional<string | number>`|

## Preprocessing type aliases

### Union type aliases with string literal subtypes

If a type alias is a union containing two or more string literals, create an enum with its string literal subtypes, and replace them in the type alias with a reference to the enum.

|From|To|
|---|---|
|`someMethod(argName: number | 'a' | 'b' | 'c'): any`|`someMethod(argName: number | ArgNameValue): any`|

## Unsupported types

### Array of union type

### Union type as generic argument

## Union-safe categories

These are applied first to any type and, for union types, any subtypes non-recursively.

### Primitive or simple reference types

Simple reference types are reference types with no generic arguments, or with only simple reference types as generic arguments.

Transpile directly.

|From|To|
|---|---|
|`string`|`String`|
|`number`|`double`|
|`SomeClass<string[]>`|`SomeClass<ArrayList<String>>`|

### Array of reference or primitive type

Transpile directly.

### String literal type

If part of a union and there is at least another string literal subtype in the same union,
create an enum from it and any other string literal types in the union.
Otherwise, throw an exception.

### Inline interface type with no index property or with one index property and more than one regular property

Move into own class.
Do not deduplicate if two interfaces (inline or named) have the same structure.

### Inline interface type with one index property and no regular properties

## Top-level categories

Note that these categories only apply to top-level types. For example, an array of a union type cannot be overloaded.

### Union of reference, primitive, array of reference, or array or primitive types

Overload.
