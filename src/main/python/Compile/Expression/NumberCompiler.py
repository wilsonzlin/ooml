import ast

from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class NumberCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Num) -> str:
        if type(expr.n) == complex:
            raise UnsupportedSyntaxError(expr, "Complex numbers")

        return str(expr.n)
