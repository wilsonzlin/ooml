from Error.CompileError import CompileError


class BuildError(CompileError):
    def __init__(self, name: str, message: str):
        super().__init__("[BUILD] {}: {}".format(name, message))
