import ast

from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.PContext import PContext


class NonlocalCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Nonlocal) -> str:
        for name in stmt.names:
            try:
                ctx.add_nonlocal(name)
            except NameError as e:
                raise InvalidSyntaxError(stmt, str(e))

        return ""
