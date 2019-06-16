from typing import Dict

from FQN import FQN
from Processing.PClass import PClass


class Compilation:
    def __init__(self):
        self.processed_classes: Dict[FQN, PClass] = {}

    def add_class(self, fqn: FQN, cls: PClass):
        if self.has_class(fqn):
            raise SystemError(f'"{FQN}" has already been compiled')

        self.processed_classes[fqn] = cls

    def has_class(self, fqn: FQN):
        return fqn in self.processed_classes
