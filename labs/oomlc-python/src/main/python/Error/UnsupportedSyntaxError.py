import ast
from typing import Union

from Error.InvalidSyntaxError import InvalidSyntaxError
from Pos import Pos


class UnsupportedSyntaxError(InvalidSyntaxError):
    def __init__(self, position: Pos, unsupported: Union[str, ast.AST]):
        if isinstance(unsupported, ast.AST):
            unsupported = unsupported.__class__.__name__

        super().__init__(position, f'Not supported: {unsupported}')
