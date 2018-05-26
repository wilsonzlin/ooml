from Error.CyclicDependencyError import CyclicDependencyError


class DependencyPath:
    def __init__(self, parts: list):
        self.parts = parts

    def __add__(self, other):
        try:
            index = self.parts.index(other)
        except ValueError:
            return DependencyPath(self.parts + [other])
        else:
            raise CyclicDependencyError(DependencyPath(self.parts[index:] + [other]))

    def __str__(self):
        if not self.parts:
            return ""

        return "\n\t⬑".join(self.parts[0])
