# Notes

## Operators

### Transpiling

Given `a * b`

|Method|Example|Required types|
|---|---|---|
|Use directly|`a * b`|Union[int, float, bool], Union[int, float, bool]|
|Map to a builtin method|`a.repeat(b)`|str, Union[int, bool]|
|Map to a helper function|`window.oomlpy.seq.__multiply(a, b)`|List, Union[int, bool]|
|Map to an inferred overload|`a.multiply(b)`|any, any|
|Map to a delegate|`window.oomlpy.__delop.multiply(a, b)`|any, any|

All methods except the last one (delegating) requires the type to be known at compile-time.
  
### Equality

#### Deep equality

### Access

## Method calls

Usually, calling a method transpiles normally.

  - If it's defined in Python, it's defined in JS.
  - If it doesn't exist, an error is thrown.
  - This is true even if type is unknown at compile-time (although if the type is known, an invalid call usually results in an error).
  
However, this doesn't apply to methods on builtin types and modules.

- Python builtins are mapped to JS native types (e.g. `str` -> `String`) or helper libraries (e.g. `datetime` -> `moment`).
- Therefore, can't directly transpile (e.g. `"abc".startswith("a")` -/-> `"abc".startswith("a")`).

Method calls need to be mapped to an expression or helper function (e.g. `"abc".startswith("a")` -> `window.oomlpy.str.startswith("a")`.

- However, this is only possible if the type is known at compile-time.
  - Either inferred or declared.
- Type annotations are still new to Python and most users don't use them yet, so need a way to do so without compile-time types.

Therefore, map to a delegate instead:

  - `"abc".startswith("a")` -> `oomlpy.__delfn.startswith("abc", "a")`.
  - The delegate function will check if it's a builtin, and will call the appropriate function if it is; otherwise, it simply calls the instance method as usual.

## Exceptions

### Interop mapping

### Overlapping mapping

It's possible that more than one exception type in Python maps to one error type in JS.

If so, when compiling, the compiler needs to be aware of this when dealing with exceptions.

#### Multiple `except`

```python
try:
  something()
except KeyError as e:
  pass
except AttributeError as e:
  pass
except NameError as e:
  pass
```

#### Propagating

```python
try: 
  try:
    something()
  except KeyError as e:
    raise AttributeError from e
except NameError:
  pass
```

#### Raising

```python
def something():
  raise AttributeError()
```

### LBYL vs. EAFP

Python excessively uses exceptions compared to JS. Therefore if consistency is desired, most JS methods and functions can't be used directly. A wrapper is needed to throw errors like Python.
