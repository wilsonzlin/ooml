import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Compiling.Statement.StatementCompiler import StatementCompiler
from Compiling.TargetsCompiler import TargetsCompiler
from Processing.PContext import PContext


class ForCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.For):
        # TODO orelse

        iter_var = ctx.generate_and_use_symbol("iterator")
        compiled_iter = "{} = window.oomlpy.__fn.iter({});\n".format(
            iter_var,
            ExpressionCompiler.compile(ctx, stmt.iter))

        next_var = ctx.generate_and_use_symbol("iterator_next")

        compiled_target = TargetsCompiler.compile(ctx, stmt.target, f"{next_var}.value")
        compiled_body = StatementCompiler.compile_body(ctx, stmt.body)

        compiled = f"""
            {compiled_iter}
            while (true) {{
                {next_var} = {iter_var}.next();
                if ({next_var}.done) {{
                    break;
                }}
                {compiled_target};
                {compiled_body}
            }}
        """

        return compiled
