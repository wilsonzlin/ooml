import ast
import sys
from random import SystemRandom
from typing import Union, Tuple, List

from SymLink import SymLink
from Error.DependencyError import DependencyError
from FQN import FQN
from Pos import Pos


def indent(code: str, level: int = 1) -> str:
    tabs = "\t" * level
    return (tabs + tabs.join(code.split("\n"))).rstrip()


def flatten(seq: Union[Tuple, List]) -> List:
    flat = []

    for elem in seq:
        if type(elem) == tuple or type(elem) == list:
            flat.extend(flatten(elem))
        else:
            flat.append(elem)

    return flat


def create_js_string_literal(value: str) -> str:
    # TODO Needs to handle more edge cases and Unicode (e.g. Unicode line terminators)
    return '"' + value \
        .replace("\\", "\\\\") \
        .replace("\r", "\\r") \
        .replace("\n", "\\n") \
        .replace("\"", "\\\"") + '"'


def generate_symbol(prefix: str = "") -> str:
    cryptorand = SystemRandom()
    rand_suffix = str(cryptorand.randrange(0, sys.maxsize))
    return f"___tmp_{prefix}_{rand_suffix}"


def convert_import_to_symlinks(*, importer: FQN, n: Union[ast.Import, ast.ImportFrom], p: Pos) -> List[SymLink]:
    symlinks = []

    if isinstance(n, ast.Import):
        # ast.alias instances don't have position information
        for n_alias in n.names:
            # NOTE: This assumes that $n_alias.name is a reference to a module, not a function or variable
            import_fqn = FQN(n_alias.name.split("."), None)
            import_name = n_alias.asname or import_fqn.base()
            symlinks.append(SymLink(import_fqn, import_name))

    else:
        # ast.alias instances don't have position information
        if n.level:
            # Relative import
            import_fqn = importer

            for _ in range(n.level):
                try:
                    import_fqn = import_fqn.parent()
                except NameError:
                    raise DependencyError(p, "Import exceeds module")

            # NOTE: This assumes that $n.module is a reference to a module, not a function or variable
            if n.module:
                import_fqn = import_fqn.extend(n.module.split('.'))

            for n_alias in n.names:
                symlinks.append(SymLink(import_fqn + n_alias.name, n_alias.asname or n_alias.name))

        else:
            # Absolute import
            # NOTE: This assumes that $n.module is a reference to a module, not a function or variable
            import_fqn = FQN(n.module.split("."), None)
            for n_alias in n.names:
                symlinks.append(SymLink(import_fqn + n_alias.name, n_alias.asname or n_alias.name))

    return symlinks
