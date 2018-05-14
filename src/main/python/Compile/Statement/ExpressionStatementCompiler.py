import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class ExpressionStatementCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Expr) -> str:
        return ExpressionCompiler.compile(ctx, stmt.value)
