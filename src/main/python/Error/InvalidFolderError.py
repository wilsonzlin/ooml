from Error.CompileError import CompileError


class InvalidFolderError(CompileError):
    def __init__(self, path: str):
        super().__init__("Folder has mixed content at {}".format(path))

