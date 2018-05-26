# Interop

## Priority

|Target|Description|
|---|---|
|1. Web development|Don't try to make the entire Apache Commons, Numpy, or the Linux kernel work with ooml. There's no need to make every single language feature work, especially if they should/would never be used in a web app/ooml context.|
|2. JavaScript|If it can't be done in JS, is very difficult, or is very inefficient, don't do it.|
|3. Interoperability/General Language|Every module should be usable in any supported languages, making sure it meets the rules and provides clear types and APIs.|
|4. Language-specific features|One of the purposes of supporting other languages is to take advantage of each language, so try to implement as many as possible.|

## Notable language features

### Python 3+

- Metaclasses
- Unbounded integers, complex numbers, decimals, and fractions
- Function-only scope
- Attributes and items are different
- Getting non-existent attributes is an error, setting is not
- Magic methods
  - Type conversion
  - Attribute access
- Variable-length and required keyword arguments
- Automatic binding of `self` when getting instance and class methods defined as functions on the class by the user
- Getting and setting of arbitrary attributes on user-defined functions
- Format strings
- Class and function decorators
  - @staticmethod
  - @classmethod
- Comparators that actually compare (e.g. `[1, 2] == [1, 2]`)

### Java 8+

- Single inheritance with multiple interfaces
- Generics
- Type erasure
- Annotations
- Overloading
- Overriding
  - Invariant parameters, covariant return type
- Covariant arrays

## Exceptions

### Causes

#### Dynamic referencing

#### Type conversion

### Builtins

- Map to common ooml exception classes; don't create one for each language as this does not help with interop (each platform's exceptions would need to be known **and provided to every other platform**)

### Chaining

## Iterators

- Throw exception vs. return value
- Iterables
- Generators
- Can't just wrap in `try...catch`, as iterators can be called manually:

```python
some_iterator = obj.__iter__()

try:
  next = some_iterator.__next__()
except StopIteration:
  return
```

If the iterator was wrapped, the above code transpiled to JS would no longer work. This is not taking into consideration cross-platform interop and nested iterator calls.

## Comparators

- Equality and identity

## Collections

## Containers

- Subscripting
- Membership testing

## Functions

### Closures

### Anonymous

### First-class

### Keyword parameters

An idea:

```python
class A:
  def a(self, b, c, *d, *, e, f, **g):
    pass
```

```java
class A{
  Object a(Object e, Object f, Map<?> g, Object b, Object c, Object... d) {
    return null;
  }
}
```

### Overloading

### Default values

### Parameter/argument lengths mismatch

### Variable-length parameters

### Argument unpacking

#### Keyword argument unpacking

#### Dynamic argument unpacking

## Types

### Callables

#### Custom callables

### Generics

#### Overloadable generic parameters

```cs
class A<T> {}
class A<T, U> {}
```

### Full type erasure

### Covariance and contravariance

- Universal and existential types
- Declaration-site and use-site
- Wildcards (Java)

### Anonymous fixed structures

#### Tuples

#### Object literals

- Interaction with maps

#### TypeScript interfaces

## Operators

### Overloading

#### Arithmetic

#### Equality

- Identity
- Contents
- Used behind-the-scenes (e.g. for searching in lists or resolving hash collisions)

#### Comparison

## Hash-based data structures (i.e. maps and sets)

### Equality comparison

### Valid key types

### Mutables

### Passing across platforms

For example, a Python dictionary passed to a Java method, or a Python dictionary passed to a JS function.

Differences in equality checking (esp. for native types) and hashing will cause difficulties.

### Hashes

|Language|Methods|Type|Builtin mutables|Builtin immutables|General|Resolution|
|---|---|---|---|---|---|---|
|Java|`.hashCode`|Integer|Allowed; based on contents|Allowed|Allowed; based on identity; can be overridden|`.equals`|
|Python|`__hash__`|Integer|Not allowed|Allowed if recursively immutable|Allowed; based on identity; can be overridden|`==`|
|Ruby|`hash`|Any|Allowed (inc. strings); based on contents|Allowed|Allowed; based on identity; can be overridden|`.eql?`|
|JavaScript|N/A|N/A|Allowed; based on identity|Allowed; based on contents|Allowed; based on identity; cannot be overridden|`===` except for `NaN` and `-0`|

## Immutables

### Frozens

#### Passing frozens to general type
