import sys
from random import SystemRandom
from typing import Union, Tuple, List


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
    # TODO Probably needs to handle more edge cases and Unicode (e.g. Unicode line terminators)
    return '"' + value \
        .replace("\\", "\\\\") \
        .replace("\r", "\\r") \
        .replace("\n", "\\n") \
        .replace("\"", "\\\"") + '"'


def generate_symbol(prefix: str = "") -> str:
    cryptorand = SystemRandom()
    rand_suffix = str(cryptorand.randrange(0, sys.maxsize))
    return f"___tmp_{prefix}_{rand_suffix}"
