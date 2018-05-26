import ast

from Compile.Util import create_js_string_literal
from Processing.Context import Context


class StringCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Str) -> str:
        return create_js_string_literal(expr.s)
