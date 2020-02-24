import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class SubscriptCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Subscript) -> str:
        compiled_target = ExpressionCompiler.compile(ctx, expr.value)

        if isinstance(expr.slice, ast.Index):
            compiled_index = ExpressionCompiler.compile(ctx, expr.slice.value)

            return "window.oomlpy.__delop.idx({}, {})".format(compiled_target, compiled_index)

        elif isinstance(expr.slice, ast.Slice):
            compiled_lower = ExpressionCompiler.compile(ctx, expr.slice.lower)
            compiled_upper = ExpressionCompiler.compile(ctx, expr.slice.upper)
            compiled_step = ExpressionCompiler.compile(ctx, expr.slice.step)

            return "window.oomlpy.__delop.slice({}, {}, {}, {})".format(
                compiled_target,
                compiled_lower,
                compiled_upper,
                compiled_step)

        else:
            raise UnsupportedSyntaxError(expr.slice, "Non-index non-slice subscripting")
