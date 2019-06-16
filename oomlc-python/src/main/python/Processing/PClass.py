from typing import List, Optional

from FQN import FQN


class PClass:
    def __init__(self, fqn: FQN):
        self.fqn = fqn

        self.parent: Optional[FQN] = None
        self.dependencies: List['PClass'] = []

    def add_dependency(self, file: 'PClass'):
        self.dependencies.append(file)

    def set_parent(self, fqn: FQN):
        self.parent = fqn
