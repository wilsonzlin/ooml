# Source code style

## Use descriptive function names

## Refactor common or unclear code to own function

Don't be afraid to use lots of functions.

## Use functions consistently

For example, use `u_iterate`, not for loops or `forEach`

## Don't use `const`

Babel adds bloat when transpiling.

## Keep to ES5 syntax

Only use the following newer syntax:

- Arrow functions
- Let
- Template literals

## Use `let` at top level to detect variable clashes

## Don't use `new` when instantiating Error objects

UglifyJS does not remove it, even with relevant compressor options enabled.

## Use TYPEOF_* instead of string

Easier to minify and prevents typos.

## Single-purpose static variables

Prefix them with `SV`.

## Internal property names

Prefix them with `IP`.

## Other than functions imported from files, prototype aliases, and single-purpose static variables, use `__` prefix for global variables

Prevent collisions and easily see usage.

## Parse errors

Don't add context to errors; instead, allow callee to add context to error message.
