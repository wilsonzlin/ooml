# Interpreting class references

|Form|From anonymous class or top-level instantiation|From class or instantiation in anonymous namespace|From class in named namespace|Rules|
|---|---|---|---|---|
|`c`|The anonymous class `c`|The class `c` in the same namespace|The class `c` in the same namespace|Use `this` for self reference (using own name not allowed)|
|`ns.c`|Equivalent to `ns.ns.c`|Equivalent to `ns.ns.c`|The class `c` in the namespace `ns` in the same module|`ns` != own named namespace|
|`mod.ns.c`|As described|As described|As described|`mod` != own named module; search own group first if compiling group as a whole|
|`group.mod.ns.c`|As described|As described|As described|`group.mod` != own group.mod; find from already loaded `group` first, and then from own group if `group` == own group and loading group as a whole; order doesn't matter as there can only be one `group.mod`|

- When looking for a module, the last loaded module is used if there are more than one with the same name.
  - Modules can come from different groups or be anonymous.
  - When referencing a module, it is cached, so future modules loaded with the same name do not alter pre-existing classes.
- A class must have a name. If it is not in a namespace, it is anonymous, and can only be referred to by other anonymous classes.
- If a namespace is in a module, it must have a name. If it is not in a module, it is anonymous and must not have a name.
  - Anonymous namespaces (and classes in them) cannot be referred to by classes in other namespaces, including anonymous ones.
- A module must be named. If it is not in a group, it is anonymous, and cannot be referred to using a group.
- A group must be named.
- References to own group+module/module/namespace name will cause an error, even if an already-loaded one has the same name.
    - This is to prevent cyclic self references and repeated loading of the same class.
