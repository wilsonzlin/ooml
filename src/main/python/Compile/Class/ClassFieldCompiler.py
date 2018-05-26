import ast
from typing import Union

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.Builder.BuilderMirror import BuilderMirror
from Processing.Context import Context


class ClassFieldCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: Union[ast.Assign, ast.AnnAssign]) -> BuilderMirror:
        # TODO Type annotations
        if len(stmt.targets) != 1:
            raise InvalidSyntaxError(stmt, "Class field statement has multiple targets")

        if not isinstance(stmt.targets[0], ast.Name):
            raise InvalidSyntaxError(stmt, "Class field statement does not assign to name")

        name = stmt.targets[0].id
        compiled_value = ExpressionCompiler.compile(ctx, stmt.value)

        field_builder = BuilderMirror("ClassFieldBuilder")

        field_builder.setName(name)
        # TODO
        field_builder.setValue(compiled_value)

        return field_builder
