# Exception

## Handling

### `else`

Code in `else` is **not** the same as appending to the `try` block.

Code in `else` is **not** the same as appending to after the `try` block.

`else` needs to work in conjunction with `finally`.

A plan:

```python
try:
  return 1
except ValueError:
  return 2
except OSError as e:
  return 3
except:
  return 4
else:
  if a:
    return 5
  raise Error
finally:
  return 6
```

```javascript
var failed = false;
var else_block = function () {
  // Because all else variables are moved to a function, 
  // ensure all variables are declared in the outer scope
  if (a) {
    return 5;
  }
  throw new Error();
};
try {
  return 1;
} catch (e) {
  failed = true;
  if (e instanceof ValueError) {
    return 2;
  } else if (e instanceof OSError) {
    return 3;
  } else {
    return 4;
  }
} finally {
  var else_rv;
  var else_err;
  var else_thrown = false;
  if (!failed) {
    try {
      else_rv = else_block();
    } catch (e) {
      // Use boolean in case $e is undefined
      else_thrown = true;
      else_err = e;
    }
  }
  
  return 6;
  
  // If `finally` does not return or throw, this will be reached;
  // otherwise, minifier will remove unreachable code
  if (!failed) {
    if (else_thrown) {
      throw else_err;
    } else if (else_rv !== undefined) {
      // Since `undefined` can't be used in Python,
      // and plain `return` returns `null`, this should work
      return else_rv;
    }
  }
}
```

## Python 2 vs. 3

In Python 2, `raise` in `else` or `finally` raises the last caught exception (i.e. handled by an `except`).

In Python 3, `raise` in `else` or `finally` raises the last **uncaught** exception.

In both versions, a `raise` in `except` will raise the currently-handled exception, as long as no exception has been raised from the beginning of the block to the bare `raise` statement.

```python
try:
  0/0
finally:
  raise
```

```python
try:
  0/0
except:
  pass
finally:
  raise
```

Given these rules, it's not recommended to use `raise`. Things can get confusing...

```python
try:
  0/0
except:
  try:
    0/0
  except:
    pass
finally:    
  raise
```

## Warnings

Warnings are printed to `stderr`, so ` console.warn` would seem to be a good fit. 

But warnings can be raised and caught.
