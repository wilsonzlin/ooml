import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class RaiseCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Raise) -> str:
        if not stmt.exc:
            raise UnsupportedSyntaxError(stmt, "Standalone raise")

        # Silently ignore $cause

        compiled_exc = ExpressionCompiler.compile(ctx, stmt.exc)

        return f"throw {compiled_exc}"

