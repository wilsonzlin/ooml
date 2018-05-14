import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class SubscriptCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Subscript) -> str:
        compiled_target = ExpressionCompiler.compile(ctx, expr.value)

        if isinstance(expr.slice, ast.Index):
            compiled_subscript = ".get(" + ExpressionCompiler.compile(ctx, expr.slice.value) + ")"

        elif isinstance(expr.slice, ast.Slice):
            if expr.slice.step is not None:
                raise UnsupportedSyntaxError(expr.slice, "Slices with step")

            compiled_lower = ExpressionCompiler.compile(ctx, expr.slice.lower)
            compiled_upper = ExpressionCompiler.compile(ctx, expr.slice.upper)

            compiled_subscript = f".slice({compiled_lower}, {compiled_upper})"

        else:
            raise UnsupportedSyntaxError(expr.slice, "Non-index non-slice subscripting")

        return f"{compiled_target}{compiled_subscript}"
