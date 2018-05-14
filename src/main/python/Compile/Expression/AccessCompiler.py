import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class AccessCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Attribute) -> str:
        compiled_src = ExpressionCompiler.compile(ctx, expr.value)
        return "{}.{}".format(compiled_src, expr.attr)
