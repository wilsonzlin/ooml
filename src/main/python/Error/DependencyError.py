from Error.CompileError import CompileError
from Processing.Compilation.PFile import PFile


class DependencyError(CompileError):
    def __init__(self, msg: str, source: PFile):
        super().__init__(f'{msg} [{source.path}]')
