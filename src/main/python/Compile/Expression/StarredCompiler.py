import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class StarredCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Starred) -> str:
        compiled_val = ExpressionCompiler.compile(ctx, expr.value)
        return "...{}".format(compiled_val)
