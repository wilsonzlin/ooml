import ast
from typing import Union

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class ListOrTupleOrSetCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: Union[ast.List, ast.Tuple, ast.Set], freeze_tuple: bool = True) -> str:
        # $freeze_tuple needs to be recursive e.g. `(a, (b, c)) = (1, (2, 3))`
        compiled_elems = [ExpressionCompiler.compile(ctx, val, freeze_tuple=freeze_tuple) for val in expr.elts]

        compiled = "[" + ", ".join(compiled_elems) + "]"

        if isinstance(expr, ast.Tuple) and freeze_tuple:
            compiled = "window.Object.freeze(" + compiled + ")"

        elif isinstance(expr, ast.Set):
            compiled = "window.Set(" + compiled + ")"

        return compiled
