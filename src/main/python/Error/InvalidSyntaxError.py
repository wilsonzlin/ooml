from Error.CompileError import CompileError
from Pos import Pos


class InvalidSyntaxError(CompileError):
    def __init__(self, position: Pos, message: str):
        super().__init__(position, message)
