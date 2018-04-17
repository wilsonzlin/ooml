# Set name for group/module/namespace/class before validating

Otherwise self references won't be detected.

# Ordering

In bytecode, groups, modules, namespaces, and classes all need to be ordered in order to make sure references dereference correctly when being executed by runtime.

Also, the order of initialiser execution is dependent on order of classes, namespaces, and modules.

# Reference checking during build

- Check if passthrough property is valid and not cyclic.
  - The only way for cycle is if the type and passthrough property are self referencing.
- Dereference classes for types.
- Dereference classes for class parents.
- Check if properties are overriding correctly.
- Check if property substitutions are valid.
- Check if property linked methods are valid.
- Check if DOM event handler linked methods are valid.

Only check when `compile` is called; this allows builders to be independent and reusable.
Curry arguments across inner `compile` calls.

# Use separate storage for unchecked units

This way, when validating:

- Dereferencing guarantees the unit is valid.
- Forward references are prevented.
  - For example, without separating unchecked, if class `A` is added to `mod`, then `B`, then `mod` is validated,
    a reference in `A` to `B` would be valid as `B` exists. If there were separated storage, `A` would not find `B`
    while being validated, as `B` has not been reached for validation yet.

# Validation expiry

A `compile` call only guarantees validaty at the time its called. Therefore, always call it when executing the unit,
even if it has been compiled before.

# Error handling

Catch any errors when validating nested units to add context.
