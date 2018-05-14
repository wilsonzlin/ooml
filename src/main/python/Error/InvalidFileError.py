from Error.CompileError import CompileError


class InvalidFileError(CompileError):
    def __init__(self, path: str):
        super().__init__("Unknown file found at {}".format(path))

