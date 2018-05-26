import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Compile.Statement.StatementCompiler import StatementCompiler
from Processing.Context import Context


class WhileCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.While) -> str:
        # TODO orelse

        compiled_test = ExpressionCompiler.compile(ctx, stmt.test)
        compiled_body = StatementCompiler.compile_body(ctx, stmt.body)

        return f"""
            while (window.oomlpy.__delstx.if({compiled_test})) {{
                {compiled_body}
            }}
        """
