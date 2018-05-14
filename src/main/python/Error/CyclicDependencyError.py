from Error.CompileError import CompileError
from Processing.DependencyPath import DependencyPath


class CyclicDependencyError(CompileError):
    def __init__(self, dep_path: DependencyPath):
        super().__init__("Cyclic import:\n\n" + str(dep_path))

