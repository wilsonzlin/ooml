# Support

## Methods

### Not (yet) supported

- `value in iterable`
- `value in iterator`
- `elem in sequence`

- `numbers.Complex.real`
- `numbers.Complex.imag`
- `numbers.Complex.conjugate()`

- `numbers.Rational.numerator`
- `numbers.Rational.denominator`

- `int.to_bytes`
- `int.from_bytes`

- `float.as_integer_ratio()`
- `float.hex()`
- `float.fromhex()`

- `str.encode(encoding="utf-8", errors="strict")`
- `str.format(*args, **kwargs)`
- `str.format_map(mapping)`
- `str.isidentifier()`
- `str.istitle()`
- `str.maketrans(x, y, z)`
- `str.swapcase()`
- `str.title()`
- `str.translate()`
- `str % format`

- `tuple`
- `bytes`
- `bytearray`
- `memoryview`
- `frozenset`
- `contextmanager`

- `object.__dict__`
- `instance.__class__`
- `class.__bases__`
- `definition.__name__`
- `definition.__qualname__`
- `class.__mro__`
- `class.mro()`
- `class.__subclasses__()`

- abstract base classes
- bytes literals
- format strings

- set methods that take any iterable as other parameters
- set methods taking more than one other parameter

Binary operations that mix set instances with `frozenset` return the type of the first operand. For example: `frozenset('ab') | set('bc')` returns an instance of `frozenset`.

Note, the elem argument to the `__contains__()`, `remove()`, and `discard()` methods may be a set. To support searching for an equivalent frozenset, a temporary one is created from elem.
