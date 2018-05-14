# Operator

## Overloads

### Reflective precedence

Copied verbatim from the Python documentation:

=====

For objects `x` and `y`, first `x.__op__(y)` is tried. If this is not implemented or returns `NotImplemented`, `y.__rop__(x)` is tried. If this is also not implemented or returns `NotImplemented`, a `TypeError` exception is raised. But see the following exception:

Exception to the previous item: if the left operand is an instance of a built-in type or a new-style class, and the right operand is an instance of a proper subclass of that type or class and overrides the base's `__rop__()` method, the right operand's `__rop__()` method is tried before the left operand's `__op__()` method.

This is done so that a subclass can completely override binary operators. Otherwise, the left operand's `__op__()` method would always accept the right operand: when an instance of a given class is expected, an instance of a subclass of that class is always acceptable. 

=====

NOTE: The exception behaviour applies as long as `y` has `__radd__` and is a subtype of `x`, regardless of whether `x` has (i.e. implements or inherits) `__add__` or `__radd__`. (If `x` has neither, then of course `y` will take precedence.)

#### Comparisons

Copied verbatim from the documentation:

=====

There are no swapped-argument versions of these methods (to be used when the left argument does not support the operation but the right argument does); rather, `__lt__()` and `__gt__()` are each other’s reflection, `__le__()` and `__ge__()` are each other’s reflection, and `__eq__()` and `__ne__()` are their own reflection. If the operands are of different types, and right operand’s type is a direct or indirect subclass of the left operand’s type, the reflected method of the right operand has priority, otherwise the left operand’s method has priority. Virtual subclassing is not considered.

=====

#### `None`

If the LHS sets an overload to `None`, the reflective overload will not be called (assuming it takes precedence over RHS). The behaviour of setting an RHS overload to `None` is unknown. 

#### `__rpow__`

From the docs:

====

Note that ternary `pow()` will not try calling `__rpow__()` (the coercion rules would become too complicated).

=====
