# Always put bytecode and loaded classes after loading entire module/anon-ns/anon-class

Otherwise it becomes possible to reference own module/namespace/class.

# Ordering

In runtime, modules, namespaces, and classes all do not need to be ordered. The execution order is provided by the bytecode, which guarantees references dereference correctly. Since no further processing is needed, they can be stored in an unordered map for performance without problems.

# Loading units

- Anonymous class: only one may exist with the same name; loading another one with the same name causes an error
- Anonymous namespace: no way to have duplicate as they have no name
- Module: loading hides any existing module with the same name, regardless of its or the previous module's group; pre-existing classes referring to hidden module still works, but the hidden module can now only be referred to with a group prefix (which means it's no longer accessible if it's anonymous)
  - Loading a module in a group with the same name as an existing module in the group causes an error
