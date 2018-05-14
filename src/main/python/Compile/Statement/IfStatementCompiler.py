import ast

from Compile import Util
from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Compile.Statement.StatementCompiler import StatementCompiler
from Processing.Context import Context


class IfStatementCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.If) -> str:
        compiled_test = ExpressionCompiler.compile(ctx, stmt.test)
        compiled_body = [StatementCompiler.compile(ctx, s) for s in stmt.body]
        compiled_orelse = [StatementCompiler.compile(ctx, s) for s in stmt.orelse]

        return "if ({}) {\n{}\n} else {\n{}\n}".format(compiled_test,
                                                       Util.indent("\n".join(compiled_body)),
                                                       Util.indent("\n".join(compiled_orelse)))
