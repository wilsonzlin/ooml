import ast

from Compile.Class.ClassCompiler import ClassCompiler
from Error.ConflictingNameError import ConflictingNameError
from Error.DependencyNotFoundError import DependencyNotFoundError
from Processing.Compilation.PClass import PClass
from Processing.Compilation.PCompilation import PCompilation
from Processing.Compilation.PFile import PFile
from Processing.Context import Context
from Processing.DependencyPath import DependencyPath
from Processing.FQN import FQN


class FileCompiler:
    @staticmethod
    def compile(proc: PCompilation, fqn: FQN, file_path: str, dependencies: DependencyPath) -> PFile:
        # Ensure not cyclic
        out_dep_path = dependencies + file_path

        # Ensure unique FQN
        file = proc.get_known_file(fqn)
        if file:
            # FQN already known to compiler
            if file.path != file_path:
                # Another file with the same FQN exists
                raise ConflictingNameError(file_path, file.path)
            else:
                # This file has already been compiled
                return file
        else:
            # File has yet to be compiled
            file = PFile(file_path, fqn)
            proc.set_file(fqn, file)

        # Create loader that will be called for all `import` statements at the top-level
        # (not in any top-level or nested class)
        def loader(import_name: str) -> PClass:
            imp_abs_fqn = proc.fully_qualify_import(import_name, file)
            imp_file_path, imp_rem_parts = proc.find_file_for_import(imp_abs_fqn)

            if imp_file_path is None:
                raise DependencyNotFoundError(import_name, file)

            impf = FileCompiler.compile(proc, imp_abs_fqn, imp_file_path, out_dep_path)
            cls = impf

            for p in imp_rem_parts:
                if p not in cls:
                    raise DependencyNotFoundError(import_name, file)
                cls = cls[p]

            file.add_dependency(impf)

            return cls

        # TODO Load builtin functions and exceptions
        context = Context(None, loader=loader)

        with open(file_path) as _:
            top = ast.parse(_.read(), file_path)

        ClassCompiler.compile_body(context, top.body, file)
