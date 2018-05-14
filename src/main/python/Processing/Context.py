from typing import Optional
from random import SystemRandom
import sys


class Context:
    def __init__(self, parent: Optional['Context'] = None):
        self.parent = parent
        self.symbols = {}
        pass

    def get_symbol(self, name: str):
        # TODO
        pass

    def generate_symbol(self, prefix: str = "") -> str:
        # Leave this an instance method just in case reference to state is needed
        cryptorand = SystemRandom()
        rand_suffix = str(cryptorand.randrange(0, sys.maxsize))
        return f"___tmp_{prefix}_{rand_suffix}"
