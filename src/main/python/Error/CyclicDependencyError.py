from Error.DependencyError import DependencyError
from Pos import Pos
from DependencyPath import DependencyPath


class CyclicDependencyError(DependencyError):
    def __init__(self, position: Pos, dependency_path: DependencyPath):
        super().__init__(position, f'Cyclic import:\n\n{str(dep_path)}')
