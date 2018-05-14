# Transform

## Syntax

Syntax transformations are done by the AST compiler.

## Calls

Expose base variable, all attributes, and all arguments as transformable parts.

### Algorithm

### Types

#### Whole reference to expression

```python
math.factorial(10)  # window.oomlpy.math.factorial(10)

math.pow(10, 1)  # 10 ** 1

",".join([])  # [].join(",")

bool(1)  # !!1

getattr(math, "floor")  # math["floor"]
```

#### Function to function

```python
range(10)  # window.oomlpy.range(10)

abs(10)  # window.Math.abs(10)

len([])  # window.oomlpy.len([]) -- Can't use .length as has to work for sets and maps
```

#### Relative attribute to relative attribute

```python
some.nested.attr  # some.nested.Attr
```

#### Attributable base to reference

```python
math.sin(1.0)  # window.Math.sin(1.0)

# Could be combined with relative attribute transformation

math.pi  # window.Math.PI
```

## Detection

For instance methods, the types of variables need to be known at compile time.

For example, `a.startswith("a")` can't be transformed to `window.oomlpy.str.startswith(a, "a")` unless `a` is known to be a string.
