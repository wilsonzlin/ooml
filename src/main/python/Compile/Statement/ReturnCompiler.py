import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class ReturnCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Return) -> str:
        if stmt.value is not None:
            compiled_val = ExpressionCompiler.compile(ctx, stmt.value)
        else:
            compiled_val = ""

        return "return " + compiled_val
