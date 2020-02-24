import ast
from typing import List, Union

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Enumerating.EClass import EClass
from Error.InvalidSyntaxError import InvalidSyntaxError
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PClass import PClass
from Processing.PContext import PContext
from SymLink import SymLink


class Compiler:
    @classmethod
    def compile_class(cls, ctx: PContext, raw_class: EClass) -> PClass:
        # TODO Decorators

        # TODO Parent

        # TODO Abstract

        last_initialiser = ""

        for u in raw_class.raw_body:
            if isinstance(u, (ast.Assign, ast.AnnAssign)):
                # Target must be single name, as checked by enumerator
                field_name = (u.targets[0] if isinstance(u, ast.Assign) else u.target).id
                field_value = ExpressionCompiler.compile(ctx, u.value)
                # TODO

            elif isinstance(u, ast.FunctionDef):
                ...

            elif isinstance(u, ast.ClassDef):
                # Nested class (or top-level class if body is actually of a PFile)
                ...

            elif isinstance(u, SymLink):
                ...

            else:
                # Part of initialiser
                ...
        ...


    @classmethod
    def compile_field(cls, ctx: PContext, stmt: Union[ast.Assign, ast.AnnAssign]) -> BuilderMirror:
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
