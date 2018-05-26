from Error.DependencyError import DependencyError
from Processing.Compilation.PFile import PFile


class DependencyNotFoundError(DependencyError):
    def __init__(self, import_name: str, source: PFile):
        super().__init__(f'Cannot resolve import "{import_name}"', source.path)
