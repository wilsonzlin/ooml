import ast
from typing import Optional


class Pos:
    def __init__(self, *, p: str, l: Optional[int] = None, c: Optional[int] = None, n: Optional[ast.AST] = None):
        self.path = p
        # Line should be 1-based
        # Column should be 0-based
        if n:
            self.line = n.lineno
            self.column = n.col_offset
        else:
            self.line = l
            self.column = c

        if not isinstance(self.line, int) or not isinstance(self.column, int):
            raise ValueError("Missing position information")

    def __str__(self):
        return f'{self.path}:{self.line}:{self.column}'
