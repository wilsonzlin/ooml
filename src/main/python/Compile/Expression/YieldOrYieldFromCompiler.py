import ast
from typing import Union

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class YieldOrYieldFromCompiler:
    @staticmethod
    def compile(ctx: Context, expr: Union[ast.Yield, ast.YieldFrom]) -> str:
        compiled_val = ExpressionCompiler.compile(ctx, expr.value)

        prefix = "yield"
        if isinstance(expr, ast.YieldFrom):
            prefix += "*"

        return f"{prefix} {compiled_val}"
