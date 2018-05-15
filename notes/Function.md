# Function

## Keyword arguments

- Function calls can take keyword arguments.
- JavaScript does not support keyword arguments.
- Therefore, function signatures need to be kept so keyword arguments can be mapped to positional ones.
- Functions can be:
  - Lambdas assigned to variables in scope.
  - Function declarations in scope.
  - Functions and lambdas on dictionary-like values (e.g. modules, dictionaries, maps, lists, classes, objects).
  - Imported functions, static methods on classes, and instance methods on objects.
  - Builtin functions.
- Python does mapping at runtime, but we need to map at compile time statically.
  - It's not possible to map at runtime, because there's no mechanism for getting argument names of JavaScript functions that is not hacky and works for all cases.
- Need to dereference callee to find function and get signature.
- Callee could be:
  - Symbol
  - Reference
  - Expression
- Expressions are hard to dereference without complex static analysis, and may be impossible.

### Native functions

Native functions declared in the compiler do have names, so they can be used with keyword arguments, unlike native functions when used in Python.

### Support

Supporting would add complexity, require storing all function signatures, and support would be inconsistent as it would not work for expression callees or functions/lambdas that are dynamic (e.g. passed as argument, stored in a container, set as dynamic attribute).

However, keyword arguments are a significant feature of Python, and would significantly make construction of ooml instances easier (if not using dictionaries).

Given this, keyword arguments should be supported if the function signature is certain at compile time.

## Signatures

### Declaration

#### Consider

- Positional vs. keyword
- Single vs. variable
- Default vs. non-default

#### Rules

- Positional first, keywords last.
- No positional parameters after variable-length parameter.
- Keyword-only parameters are the non-variable-size parameters after variable-length parameter.
- Keyword parameters must follow variable-length parameter.
- An unnamed variable-length parameter is a delimiter, and does not accept any positional parameters.
  - A variable-size parameter cannot come immediately after an unnamed variable-length parameter (but can come after a named one).
- Variable-size parameter must be very last parameter.
- Default positional parameters must follow non-default ones.
  - Non-default keyword keyword parameters can follow default ones, and vice versa. 

### Matching

- Positional parameters can be fulfilled by keyword arguments if they were not already fulfilled by a positional one.
- Unpacking a sequence argument fulfills all remaining positional parameters, not just a variable-length one. 
- Unpacking a dictionary argument fulfills all parameters with the same names as its keys, both positional and keyword, single or variable.
  - If a parameter has already been fulfilled, a TypeError is raised. 
- Keyword arguments must match a position, keyword, or variable-size parameter.
- All matching is done at runtime.

#### Compile-time matching

Requirements at the declaration site:

- Signature is known.

Requirements at the use site:

- Unpacking sequence arguments to fulfill non-variable-length positional parameters can be done with a wrapper function that checks length and calls `.apply` in JS.
- Unpacking dictionary arguments to fulfill parameters won't work if not all parameters have been guaranteed fulfilled at compile-time unless all parameter names are known at runtime.

### Interop

- Variable-size parameters and dictionary unpacking to fulfill any parameter in:
  - Java
  - JavaScript
- Variable-length parameters and sequence unpacking to fulfill remaining positional parameters in:
  - Java
  - JavaScript
- Adding to a variable-size parameter with a specific keyword argument in:
  - Java
  - JavaScript
