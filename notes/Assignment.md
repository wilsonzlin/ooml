# Assignment

## Multi-assignment

Python multi-assignment behaves the same as JS.

In the following code:

```python
b = list(range(10))
a = b[4:10] = range(10)
```

`a` is `range(10)`, not `b[4:10]` before or after splicing. This is the same behaviour as JS.

Careful unrolling is needed when transpilation does not result in assignment, for example when assigning to a slice. Don't evaluate twice, even if simple values.

### Order

Targets are assigned left-to-right, i.e. the leftmost target is assigned to first.

## Targets

### Types

|Target|Example|
|---|---|
|Name|`a = 1`|
|Attribute|`a.b = 1`|
|Index|`a[b] = 1`|
|Slice|`a[b:c] = 1`|
|Extended slice|`a[b:c, d:e] = 1`|
|Starred (collecting)|`a, b, *c = range(10)`|
|Tuple (recursive destructuring)|`a, b, (c[d], e[f:g], (h, *i)) = 1`|

Note that starred can occur anywhere once only per tuple.

This means this is possible:

```python
a, *b, (c, *d), (*e,) = [1, 2, [3, 4], 5]
```

Also note that starred can apply to names, attributes, and any subscript.

This maens this is possible:

```python
a, *b[2:5], (*c[3],), (*d.e,) = [1, 2, 3, [4, 5, 6], [7, 8, 9]]
```

### Transpiling to `var`

**NOTE**: This also applies to for loops and comprehensions.

Only use `var` if target is a name that has not been declared with `nonlocal` in local scope.

This is because it's possible variable is `nonlocal`. If `var` is used, `nonlocal` is not respected.

Subscript and attribute targets behave as expected (i.e. base name is also searched for in ancestor contexts).

Note that these rules apply to each target in a tuple, including any nested tuples.

### Destructuring

Python raises an error when destructure length is not the same as source length:

```python
a, b = [1, 2, 3]  # This raises a ValueError
```

Variable-length collecting is possible:


```python
a, b, *c = [1, 2, 3]  # a == 1, b == 2, c == [3]
```

### `for`

All of the above rules also apply to `for` loops and comprehensions.
