import ast

from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class BooleanOrNoneCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.NameConstant) -> str:
        if expr.value is True:
            return "true"

        elif expr.value is False:
            return "false"

        elif expr.value is None:
            return "null"

        else:
            raise UnsupportedSyntaxError(expr, "Unknown name constants")
