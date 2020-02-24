from typing import Optional

from Enumerating.EContext import EContext
from FQN import FQN


class EContextBuilder(EContext):
    def __init__(self, parent: Optional[EContext] = None):
        super().__init__(parent, {})

    def add_symbol(self, name: str, target: FQN) -> None:
        if name in self.symbols:
            raise NameError(f'"{name}" already exists')

        self.symbols[name] = target

    def fork(self) -> 'EContextBuilder':
        return EContextBuilder(self)

    def seal(self) -> EContext:
        return EContext(self.parent, dict(self.symbols))
