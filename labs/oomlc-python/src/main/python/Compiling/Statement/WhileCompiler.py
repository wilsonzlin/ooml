import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Compiling.Statement.StatementCompiler import StatementCompiler
from Processing.PContext import PContext


class WhileCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.While) -> str:
        # TODO orelse

        compiled_test = ExpressionCompiler.compile(ctx, stmt.test)
        compiled_body = StatementCompiler.compile_body(ctx, stmt.body)

        return f"""
            while (window.oomlpy.__delstx.if({compiled_test})) {{
                {compiled_body}
            }}
        """
