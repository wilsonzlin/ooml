# Variable

## Declaration

Python's variable declaration and scope behaviour is very similar to JavaScript's `var`:

- Variables don't need to be declared before use.
- There is no local scope for most statements with a body.
- A variable that's only assigned to in nested blocks don't need a declaration in the outer block.
  - This works with JavaScript's `var`, as redeclaring variables using it does not cause an error, and it hoists to the nearest function scope, like Python.
  
However, **beware of `nonlocal`**. See Assignment.md.

## Deletion

- Not allowed
