from typing import Optional, Callable, Dict, Any

import Util
from FQN import FQN
from Processing.PClass import PClass
from Processing.Symbol import Symbol
from Processing.SymbolType import SymbolType

_ACCESSIBLE_VAR_TYPES = frozenset([SymbolType.VAR_LOCAL, SymbolType.VAR_NONLOCAL])
_ASSIGNABLE_VAR_TYPES = frozenset([SymbolType.VAR_LOCAL, SymbolType.VAR_NONLOCAL])


class PContext:
    def __init__(self, parent: Optional['PContext'], *, loader: Optional[Callable[[FQN], Any]] = None):
        self.parent = parent
        self.loader = loader

        self.symbols: Dict[str, Symbol] = {}

    def ensure_assignable_var(self, name: str, assert_local: bool = False):
        if name in self.symbols:
            if assert_local:
                raise NameError(f'"{name}" already exists')
            else:
                if self.symbols[name].type not in _ASSIGNABLE_VAR_TYPES:
                    raise NameError(f'"{name}" is taken by something else')
        else:
            # Do not override as could be VAR_NONLOCAL
            self.symbols[name] = Symbol(SymbolType.VAR_LOCAL)

    def add_nonlocal(self, name: str):
        if name in self.symbols:
            # Even if current is nonlocal
            raise NameError(f'"{name}" already exists')
        self.symbols[name] = Symbol(SymbolType.VAR_NONLOCAL)

    def resolve_symbol(self, name: str) -> Optional[Symbol]:
        cur = self
        while cur and name not in cur.symbols:
            cur = cur.parent

        if cur is None:
            # If symbol is not found, $cur will be None
            return None

        return cur.symbols[name]

    def generate_and_use_symbol(self, prefix: str = "") -> str:
        while True:
            name = Util.generate_symbol(prefix)
            if name not in self.symbols:
                break

        self.symbols[name] = Symbol(SymbolType.VAR_GENERATED)

        return name

    def require_import(self, ref: str) -> PClass:
        cur = self
        # There has to be an ancestor with a .loader
        # Let it fail if otherwise
        while cur.loader is None:
            cur = cur.parent
        return cur.loader(ref)
