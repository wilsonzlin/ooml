import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.Context import Context


class IfExpressionCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.IfExp) -> str:
        compiled_test = ExpressionCompiler.compile(ctx, expr.test)
        compiled_body = ExpressionCompiler.compile(ctx, expr.body)
        compiled_orelse = ExpressionCompiler.compile(ctx, expr.orelse)

        return "window.oomlpy.__delstx.if({}) ? {} : {}".format(compiled_test, compiled_body, compiled_orelse)
