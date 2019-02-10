import ast

from Util import create_js_string_literal
from Processing.PContext import PContext


class StringCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Str) -> str:
        return create_js_string_literal(expr.s)
