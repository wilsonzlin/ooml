from Error.CompileError import CompileError
from FQN import FQN
from Pos import Pos


class ConflictingFQNError(CompileError):
    def __init__(self, a: Pos, fqn: FQN, b: Pos):
        super().__init__(a, f'A class already exists with the FQN "{fqn}": "{b}"')
