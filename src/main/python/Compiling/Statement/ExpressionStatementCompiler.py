import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class ExpressionStatementCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Expr) -> str:
        return ExpressionCompiler.compile(ctx, stmt.value)
