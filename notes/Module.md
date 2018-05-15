# Module

## Naming

- For modules in the sources root, use normal module naming:
  - Maximum folder depth of 3 (group.mod.ns).
  - Each folder must only contain files or folders.
  - Each module must contain either only one unit that is a class with the same name as the module, or no classes.
    - If there are no classes, it is treated as a static class, and all global declarations are fields on the class.
- For modules imported from outside sources root that may not be designed for ooml and not use ooml's fully-qualified name structure:
  - Try to align Python module name with ooml module part:
    - For example, `numpy.a.b` should be `numpy.numpy.a.b`, not `numpy.a.a.b`.
    - This is because modules are usually referred to using `mod.ns.c` not `group.mod.ns.c`, and also when actual group name is provided, everything should still work.
  - If it has a depth of 0 (e.g. `a.py`), use `a.a.a.a`.
  - If it has a depth of 1 (e.g. `a/b.py`), use `a.a.b.b`.
  - If it has a depth of 2 (e.g. `a/b/c.py`), use `a.a.b.c`.
  - If it has a depth of 3 (e.g. `a/b/c/d.py`), use `a.b.c.d`.
  - Raise an error for any other depths.
  - Use the same rules for content (e.g. only single class, or zero or more fields).
