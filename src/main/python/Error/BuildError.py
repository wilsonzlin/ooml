from Error.CompileError import CompileError


class BuildError(CompileError):
    def __init__(self, position: Position, name: str, message: str):
        super().__init__(position, f'[BUILD] {name}: {message}')
