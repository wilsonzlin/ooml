import ast
from typing import List

from Error.InvalidSyntaxError import InvalidSyntaxError
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Compilation.PClass import PClass
from Processing.Context import Context


class ClassCompiler:
    @staticmethod
    def compile(ctx: Context, cls: ast.ClassDef, proc_class: PClass):
        if cls.bases:
            if len(cls.bases) > 1:
                raise InvalidSyntaxError(cls, "Class has more than one parent")
            parent_ref = cls.bases[0].id
        else:
            parent_ref = None

        if cls.keywords:
            raise UnsupportedSyntaxError(cls.keywords[0], "Metaclasses")

        # TODO Decorators

        # TODO Parent

        # TODO Abstract
        ...

    @staticmethod
    def compile_body(ctx: Context, units: List[ast.AST], proc_class: PClass):
        last_initialiser = ""

        for u in units:
            if isinstance(u, ast.Assign):
                if len(u.targets) != 1:
                    raise InvalidSyntaxError(u, "Field declaration has multiple targets")

                if not isinstance(u.targets[0], ast.Name):
                    raise InvalidSyntaxError(u, "Field declaration has non-name target")

                field_name = u.targets[0].id
                # TODO

            elif isinstance(u, ast.FunctionDef):
                ...

            elif isinstance(u, ast.ClassDef):
                # Nested class (or top-level class if body is actually of a PFile)
                ...

            else:
                # Part of initialiser
                ...
