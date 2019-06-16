from typing import Dict

from Enumerating.EClass import EClass
from Error.ConflictingFQNError import ConflictingFQNError
from FQN import FQN


class Enumeration:
    def __init__(self):
        self.classes: Dict[FQN, EClass] = {}

    def add_class(self, cls: EClass):
        fqn = cls.fqn

        if fqn in self.classes:
            raise ConflictingFQNError(fqn, cls.position.path, self.classes[fqn].position.path)

        self.classes[fqn] = cls
