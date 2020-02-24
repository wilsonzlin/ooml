import ast

from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class BooleanOrNoneCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.NameConstant) -> str:
        if expr.value is True:
            return "true"

        elif expr.value is False:
            return "false"

        elif expr.value is None:
            return "null"

        else:
            raise UnsupportedSyntaxError(expr, "Unknown name constants")
