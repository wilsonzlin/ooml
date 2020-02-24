# References and statements

- Top-level should only have `declare`, `type`, or `interface`.
- Interfaces are compile-time helper structures, not actual code.
- References are dereferenced like so:
  - Split into parts.
  - Look for something at the same level with the first part's name.
  - If not found, look for something at a level higher with the first part's name.
  - Repeat the last step until found or top-level reached.
  - If not found in top-level, throw error.
  - If there is more than one part:
    - The first part must resolve to a namespace.
    - Traverse for each part after the first and before the last, making sure each part resolves to a namespace.
    - Find an interface, type alias, or non-namespace declaration.
