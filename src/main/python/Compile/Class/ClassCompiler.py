import ast

from Error.InvalidFileError import InvalidFileError
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.Builder.BuilderMirror import BuilderMirror
from Processing.Context import Context


class ClassCompiler:
    @staticmethod
    def compile(dep_yielder: DependencyYielder, file_path: str):
        if not file_path.endswith(".py"):
            raise InvalidFileError(file_path)

        expected_name = file_path[:-3]

        class_builder = BuilderMirror("ClassBuilder")

        context = Context()

        with open(file_path) as file:
            tree = ast.parse(file.read(), file_path)
            units = list(tree.body)

            while True:
                if isinstance(units[0], ast.Import):
                    # TODO
                    ...

                elif isinstance(units[0], ast.ImportFrom):
                    # TODO
                    ...

                else:
                    break

            if len(units[0]) != 1 or not isinstance(units[0], ast.ClassDef):
                raise InvalidSyntaxError(units[0], "Expected single class definition")

            class_def = units[0]
            if class_def.name != expected_name:
                raise InvalidSyntaxError(class_def, "Class definition name does not match file name")

            parent = None
            if len(class_def.bases) > 0:
                if len(class_def.bases) > 1:
                    raise InvalidSyntaxError(class_def, "Class has more than one parent")
                parent = class_def.bases[0].id

            # TODO Abstract

            class_body_units = list(class_def.body)

            # Do not require fields to be before methods as
            # initialisers can be in between fields

            last_initialiser = ""

            while class_body_units:
                if isinstance(class_body_units[0], ast.Assign):
                    # Field variable
                    # TODO
                    ...

                elif isinstance(class_body_units[0], ast.FunctionDef):
                    # Could be field function, initialiser (with annotation), constructor, or method
                    # TODO
                    ...

                else:
                    # Part of static initialiser
                    # TODO
                    ...
