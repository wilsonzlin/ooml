import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class BooleanOperationCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.BoolOp) -> str:
        compiled = ExpressionCompiler.compile(ctx, expr.values[0])

        if isinstance(expr.op, ast.And):
            op = "and"

        elif isinstance(expr.op, ast.Or):
            op = "or"

        else:
            raise UnsupportedSyntaxError(expr)

        for v in expr.values[1:]:
            compiled = "window.oomlpy.__delop.{}({}, {})".format(
                op,
                compiled,
                ExpressionCompiler.compile(ctx, v))

        return compiled
