import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class ReturnCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Return) -> str:
        if stmt.value is not None:
            compiled_val = ExpressionCompiler.compile(ctx, stmt.value)
        else:
            compiled_val = ""

        return "return " + compiled_val
