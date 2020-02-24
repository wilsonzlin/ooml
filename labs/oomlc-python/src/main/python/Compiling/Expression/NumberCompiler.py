import ast

from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class NumberCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Num) -> str:
        if type(expr.n) == complex:
            raise UnsupportedSyntaxError(expr, "Complex numbers")

        return str(expr.n)
