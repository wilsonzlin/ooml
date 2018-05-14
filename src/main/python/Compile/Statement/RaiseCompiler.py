import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class RaiseCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Raise) -> str:
        if not stmt.exc:
            raise UnsupportedSyntaxError(stmt, "Standalone raise")

        # Silently ignore $cause

        compiled_exc = ExpressionCompiler.compile(ctx, stmt.exc)

        return f"throw {compiled_exc}"

