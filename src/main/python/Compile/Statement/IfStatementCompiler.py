import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Compile.Statement.StatementCompiler import StatementCompiler
from Processing.Context import Context


class IfStatementCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.If) -> str:
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
