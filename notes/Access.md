# Access

## Attribute access and assignment

- Magic methods not allowed
  - `__getattr__`
  - `__getattribute__`
  - `__setattr__`
- Accessing non-existent attribute doesn't cause `AttributeError`

## Member access and assignment

- `a[b]` becomes `a.get(b)`
- `a[b] = c` becomes `a.set(b, c)`
- `b in a` becomes `a.has(b)`
- Accessing non-existent key doesn't cause `KeyError` 

## Deletion

- `del a.b` becomes `delete a.b`
- `del a[b]` becomes `a.delete(b)`
