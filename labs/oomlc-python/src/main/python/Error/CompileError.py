from Pos import Pos


class CompileError(Exception):
    def __init__(self, position: Pos, message: str):
        super().__init__(f'{message} [{position}]')
