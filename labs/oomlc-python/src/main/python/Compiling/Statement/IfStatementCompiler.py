import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Compiling.Statement.StatementCompiler import StatementCompiler
from Processing.PContext import PContext


class IfStatementCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.If) -> str:
        compiled_test = ExpressionCompiler.compile(ctx, stmt.test)
        compiled_body = StatementCompiler.compile_body(ctx, stmt.body)
        compiled_orelse = StatementCompiler.compile_body(ctx, stmt.orelse)

        return f"""
            if (window.oomlpy.__delstx.if({compiled_test})) {{
                {compiled_body}
            }} else {{
                {compiled_orelse}
            }}
        """
