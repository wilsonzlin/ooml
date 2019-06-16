import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class StarredCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Starred) -> str:
        compiled_val = ExpressionCompiler.compile(ctx, expr.value)
        return "...{}".format(compiled_val)
