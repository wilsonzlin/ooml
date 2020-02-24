import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class DeletionCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Delete) -> str:
        if len(stmt.targets) != 1:
            raise UnsupportedSyntaxError(stmt, "Multiple deletion targets")

        target = stmt.targets

        if isinstance(target, ast.Name):
            raise UnsupportedSyntaxError(stmt, "Variable deletions")

        elif isinstance(target, ast.Attribute):
            compiled = "delete " + ExpressionCompiler.compile(ctx, target)

        elif isinstance(target, ast.Subscript):
            if isinstance(target.slice, ast.Index):
                # Deletion of index
                compiled_container = ExpressionCompiler.compile(ctx, target.value)
                compiled_index = ExpressionCompiler.compile(ctx, target.slice.value)

                compiled = f"{compiled_container}.delete({compiled_index})"

            else:
                raise UnsupportedSyntaxError(target.slice, "Deletion of non-index subscripts")

        else:
            raise UnsupportedSyntaxError(target, "Unknown deletion targets")

        return compiled
