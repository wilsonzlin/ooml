from Processing.Compilation.PClass import PClass
from Processing.Compilation.PClassContainer import PClassContainer
from Processing.FQN import FQN


class PFile(PClass):
    def __init__(self, path: str, fqn: FQN):
        super().__init__(None)
        self.path = path
        self.fqn = fqn
