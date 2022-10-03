import ast
from os import listdir
from os.path import join, isfile, isdir
from typing import List, Optional, Union

import Util
from Enumerating.EClass import EClass
from Enumerating.Enumeration import Enumeration
from Enumerating.EContextBuilder import EContextBuilder
from SymLink import SymLink
from Error.DuplicateNameError import DuplicateNameError
from Error.InvalidSyntaxError import InvalidSyntaxError
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Pos import Pos
from FQN import FQN


class Enumerator:
    @classmethod
    def enumerate_dir(cls, *, enum: Enumeration, prefix: FQN, d: str):
        for e in listdir(d):
            p = join(d, e)

            if isfile(p) and e.endswith(".py"):
                cls.enumerate_file(
                    enum=enum,
                    fqn=prefix + e[:-3],
                    f=p
                )

            elif isdir(p):
                cls.enumerate_dir(
                    enum=enum,
                    prefix=prefix + e,
                    d=p
                )

            else:
                # Silently ignore
                pass

    @classmethod
    def enumerate_file(cls, *, enum: Enumeration, fqn: FQN, f: str):
        with open(f) as _:
            n_file = ast.parse(_.read(), f)

        e_body = cls.enumerate_class(
            enum=enum,
            c_file=None,
            fqn=fqn,
            body=n_file.body,
            path=f,
        )

        enum.add_class(EClass(
            fqn=fqn,
            position=Pos(p=f, l=1, c=0),
            context=None,
            raw_parent=None,
            raw_body=e_body,
            raw_decorators=[],
        ))

    @classmethod
    def enumerate_class(cls, *, enum: Enumeration, c_file: Optional[EContextBuilder], fqn: FQN,
                        body: List[ast.AST], path: str) -> List[Union[ast.AST, SymLink]]:
        """
        Process a class at any level, or a file.
        Recursively call self for any class decorations.
        Provide $c_file as None if it's a file.
        """
        if c_file:
            c_body = c_file.fork()
        else:
            # $c_file is None if $body is the body of a file (module)
            c_file = EContextBuilder()
            c_body = c_file

        e_body: List[Union[ast.AST, SymLink]] = []

        for n in body:
            n_pos = Pos(p=path, n=n)

            def add_symbol(name: str, ref: FQN):
                try:
                    c_body.add_symbol(name, ref)
                except NameError:
                    raise DuplicateNameError(n_pos, name) from None

            if isinstance(n, ast.Import) or isinstance(n, ast.ImportFrom):
                for sl in Util.convert_import_to_symlinks(importer=fqn, n=n, p=n_pos):
                    add_symbol(sl.name, sl.target)
                    e_body.append(sl)

            elif isinstance(n, ast.ClassDef):
                class_name = n.name
                class_fqn = fqn + class_name
                class_parent = None

                if n.bases:
                    first_base = n.bases[0]

                    if len(n.bases) > 1:
                        raise UnsupportedSyntaxError(n_pos, "Multiple class parents")

                    if not isinstance(first_base, ast.Name):
                        raise InvalidSyntaxError(n_pos, "Non-name class parents")

                    class_parent = first_base.id

                e_nested_class_body = cls.enumerate_class(
                    enum=enum,
                    c_file=c_file,
                    fqn=class_fqn,
                    body=n.body,
                    path=path)

                enum.add_class(EClass(
                    fqn=class_fqn,
                    position=n_pos,
                    context=c_body.seal(),
                    raw_parent=class_parent,
                    raw_body=e_nested_class_body,
                    raw_decorators=n.decorator_list))

                # Do not add to context until after enumeration
                add_symbol(class_name, class_fqn)
                e_body.append(SymLink(class_fqn, class_name))

            else:
                if isinstance(n, (ast.Assign, ast.AnnAssign)):
                    # TODO Type annotations
                    if n.targets:
                        if len(n.targets) != 1:
                            raise InvalidSyntaxError(n_pos, "Field declaration has multiple targets")
                        target = n.targets[0]
                    else:
                        target = n.target

                    if not isinstance(target, ast.Name):
                        raise InvalidSyntaxError(n_pos, "Field declaration has non-name target")

                    field_name = target.id
                    add_symbol(field_name, fqn + field_name)

                elif isinstance(n, ast.FunctionDef):
                    # TODO AsyncFunctionDef
                    fn_name = n.name
                    add_symbol(fn_name, fqn + fn_name)

                e_body.append(n)

        return e_body
