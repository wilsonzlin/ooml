# Property attribute matrix

|Can [row] exist with [col]?|[row] requires|Type|Array|Transient|Passthrough|Get|Set|Change|Binding|BindingExist|BindingMissing|DispatchHandlers|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Type|-|-|[row] is class reference|[row] is optional; primitive|[row] is class reference|Yes|Yes|Yes|[row] is optional; primitive|[row] is optional; primitive|[row] is optional; primitive|[row] is class reference|
|Array|Type|-|-|No|No|No|No|Yes|No|No|No|Yes|
|Transient|-|-|-|-|No|Yes|Yes|Yes|Yes|Yes|Yes|No|
|Passthrough|Type|-|-|-|-|Yes|Yes|Yes|Yes|Yes|Yes|Yes|
|Get|-|-|-|-|-|-|Yes|Yes|Yes|Yes|Yes|Yes|
|Set|-|-|-|-|-|-|-|Yes|Yes|Yes|Yes|Yes|
|Change|-|-|-|-|-|-|-|-|Yes|Yes|Yes|Yes|
|Binding|-|-|-|-|-|-|-|-|-|Yes|Yes|Yes|
|BindingExist|Binding|-|-|-|-|-|-|-|-|-|Yes|Yes|
|BindingMissing|Binding|-|-|-|-|-|-|-|-|-|-|Yes|
|DispatchHandlers|Type|-|-|-|-|-|-|-|-|-|-|-|

## What can be done on an overriding property?

- Change the getter or setter.
- Add a change listener.
- Add dispatch handlers.
- Change the default value.
- Change the type to a covariant type.
- Add binding change and missing handlers.

## What can't be done on an overriding property?

This means that these don't need to be revalidated when inheriting.

- Change if `array` or `transient`.
- Change, add, or remove binding.
- Change, add, or remove passthrough.
