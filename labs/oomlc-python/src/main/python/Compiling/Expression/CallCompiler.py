import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class CallCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Call) -> str:
        compiled = ExpressionCompiler.compile(ctx, expr.func) + "("

        if len(expr.keywords) > 0:
            raise UnsupportedSyntaxError(expr, "Keyword arguments")

        compiled_args = [ExpressionCompiler.compile(ctx, arg) for arg in expr.args]

        compiled += ", ".join(compiled_args) + ")"

        return compiled
