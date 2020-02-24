from typing import Dict, Optional

from FQN import FQN


class EContext:
    def __init__(self, parent: Optional['EContext'], symbols: Dict[str, FQN]):
        self.parent = parent
        self.symbols = symbols

    def get_symbol(self, name: str) -> FQN:
        if name not in self.symbols:
            raise NameError(f'"{name}" does not exist')

        return self.symbols[name]
