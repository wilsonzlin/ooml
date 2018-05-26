from Error.CompileError import CompileError


class ConflictingNameError(CompileError):
    def __init__(self, a, b):
        super().__init__(f'Duplicate names: "{a}" and "{b}"')
