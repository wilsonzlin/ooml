# Magic

|Python|ooml AIL|
|---|---|
|`__new__`|Not supported|
|`__init__`|*Constructor*|
|`__del__`|Not supported|
|`__eq__`|`equals`|
|`__ne__`|Not supported|
|`__lt__`|Maps to `compareTo`; `__eq__` must be provided; `__gt__` cannot exist; must be `@total_ordering`|
|`__gt__`|Maps to `compareTo`; `__eq__` must be provided; `__lt__` cannot exist; must be `@total_ordering`|
|`__le__`|Not supported|
|`__ge__`|Not supported|
|`__pos__`|`toPositive`|
|`__neg__`|`toNegative`|
|`__invert__`|`toComplement`|
|`__abs__`|Not supported|
|`__floor__`|Not supported|
|`__ceil__`|Not supported|
|`__trunc__`|Not supported|
|`__add__`|`add`|
|`__sub__`|`subtract`|
|`__mul__`|`multiply`|
|`__floordiv__`|Not supported|
|`__div__`|`divide`|
|`__truediv__`|Not supported|
|`__mod__`|`modulo`|
|`__pow__`|`exponentiate`|
|`__lshift__`|`leftShift`|
|`__rshift__`|`rightShift`|
|`__and__`|`conjunction`|
|`__or__`|`disjunction`|
|`__xor__`|`exclusiveDisjunction`|
|`__radd__`|`rAdd`|
|`__rsub__`|`rSubtract`|
|`__rmul__`|`rMultiply`|
|`__rfloordiv__`|Not supported|
|`__rdiv__`|`rDivide`|
|`__rtruediv__`|Not supported|
|`__rmod__`|`rModulo`|
|`__rpow__`|`rExponentiate`|
|`__rlshift__`|`rLeftShift`|
|`__rrshift__`|`rRightShift`|
|`__rand__`|`rConjunction`|
|`__ror__`|`rDisjunction`|
|`__rxor__`|`rExclusiveDisjunction`|
|`__iadd__`|`iAdd`|
|`__isub__`|`iSubtract`|
|`__imul__`|`iMultiply`|
|`__ifloordiv__`|Not supported|
|`__idiv__`|`iDivide`|
|`__itruediv__`|Not supported|
|`__imod__`|`iModulo`|
|`__ipow__`|`iExponentiate`|
|`__ilshift__`|`iLeftShift`|
|`__irshift__`|`iRightShift`|
|`__iand__`|`iConjunction`|
|`__ior__`|`iDisjunction`|
|`__ixor__`|`iExclusiveDisjunction`|
|`__int__`|Not supported|
|`__float__`|Not supported|
|`__complex__`|Not supported|
|`__index__`|Not supported|
|`__str__`|`toString`|
|`__repr__`|Not supported|
|`__format__`|Not supported|
|`__hash__`|`toHash`|
|`__nonzero__`|Not supported|
|`__dir__`|Not supported|
|`__sizeof__`|Not supported|
|`__getattr__`|Not supported|
|`__setattr__`|Not supported|
|`__delattr__`|Not supported|
|`__getattribute__`|Not supported|
|`__len__`|`length`|
|`__getitem__`|`get`|
|`__setitem__`|`set`|
|`__delitem__`|`delete`|
|`__iter__`|`iterator`|
|`__reversed__`|`toReverse`|
|`__contains__`|Not supported|
|`__missing__`|Not supported|
|`__instancecheck__`|Not supported|
|`__subclasscheck__`|Not supported|
|`__call__`|Not supported|
|`__enter__`|Not supported|
|`__exit__`|Not supported|
|`__get__`|Use `@property` instead|
|`__set__`|Use `@property` instead|
|`__delete__`|Use `@property` instead|
|`__copy__`|Not supported|
|`__deepcopy__`|Not supported|
|`__getnewargs__`|Not supported|
|`__getstate__`|Only for subclasses of `ooml.Instance`|
|`__setstate__`|Only for subclasses of `ooml.Instance`|
|`__reduce__`|Not supported|

### abs, floor, ceil, trunc

Not supported because these would map to `Math.`, and `Math.` is designed around numbers; it would not make sense to have `Math.ceil([1, 2, 3])`.
