import ast
from typing import Union

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class YieldOrYieldFromCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: Union[ast.Yield, ast.YieldFrom]) -> str:
        compiled_val = ExpressionCompiler.compile(ctx, expr.value)

        prefix = "yield"
        if isinstance(expr, ast.YieldFrom):
            prefix += "*"

        return f"{prefix} {compiled_val}"
