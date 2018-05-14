import ast
from typing import Union, Tuple, List

from Error.InvalidSyntaxError import InvalidSyntaxError


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


def get_base_names(targets: Union[ast.Name, ast.Tuple, ast.Subscript, ast.Attribute, Tuple, List]) -> List[str, ...]:
    if isinstance(targets, ast.Name):
        return [targets.id]

    elif isinstance(targets, ast.Tuple):
        return flatten([get_base_names(e) for e in targets.elts])

    elif isinstance(targets, ast.Subscript):
        return get_base_names(targets.value)

    elif isinstance(targets, ast.Attribute):
        return get_base_names(targets.value)

    elif type(targets) == tuple or type(targets) == list:
        return flatten([get_base_names(e) for e in targets])

    else:
        raise InvalidSyntaxError(targets, "Unknown targets")
