from typing import List, Optional

from Error.CyclicDependencyError import CyclicDependencyError


class DependencyPath:
    def __init__(self, parts: Optional[List[str]]):
        self.parts = parts
        if self.parts is None:
            self.parts = []

    def __add__(self, other):
        try:
            index = self.parts.index(other)
            raise CyclicDependencyError(DependencyPath(self.parts[index:] + [other]))
        except ValueError:
            return DependencyPath(self.parts + other)

    def __str__(self):
        if not self.parts:
            return ""

        return "\n\t⬑".join(self.parts[0])
