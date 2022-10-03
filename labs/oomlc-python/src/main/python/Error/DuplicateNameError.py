from Error.CompileError import CompileError
from Pos import Pos


class DuplicateNameError(CompileError):
    def __init__(self, position: Pos, name: str):
        super().__init__(position, f'"{name}" already exists')
