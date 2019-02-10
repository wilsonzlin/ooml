import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Util import create_js_string_literal
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class AccessCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Attribute) -> str:
        # TODO Map builtin methods to __delfn
        if not isinstance(expr.attr, ast.Name):
            raise UnsupportedSyntaxError(expr.attr, "Non-name attribute accesses")

        compiled_src = ExpressionCompiler.compile(ctx, expr.value)

        attr_name = expr.attr.id

        return "window.oomlpy.__delop.access({}, {})".format(
            compiled_src,
            create_js_string_literal(attr_name))
