import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Processing.PContext import PContext


class IfExpressionCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.IfExp) -> str:
        compiled_test = ExpressionCompiler.compile(ctx, expr.test)
        compiled_body = ExpressionCompiler.compile(ctx, expr.body)
        compiled_orelse = ExpressionCompiler.compile(ctx, expr.orelse)

        return "window.oomlpy.__delstx.if({}) ? {} : {}".format(compiled_test, compiled_body, compiled_orelse)
