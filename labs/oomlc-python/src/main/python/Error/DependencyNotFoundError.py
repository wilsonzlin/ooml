from Error.DependencyError import DependencyError
from Pos import Pos


class DependencyNotFoundError(DependencyError):
    def __init__(self, position: Pos, dependency: str):
        super().__init__(position, f'Cannot resolve import "{import_name}"')
