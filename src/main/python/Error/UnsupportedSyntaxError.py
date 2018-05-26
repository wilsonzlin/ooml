import ast
from typing import Optional

from Error.InvalidSyntaxError import InvalidSyntaxError


class UnsupportedSyntaxError(InvalidSyntaxError):
    def __init__(self, ast_node: ast.AST, unsup: Optional[str] = None):
        if unsup is None:
            unsup = ast_node.__class__.__name__ + " syntax units"

        super().__init__(ast_node, "{} are not supported".format(unsup))
