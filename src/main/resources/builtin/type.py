class object:
    ...


class int:
    ...


class bool(int):
    ...


class bytearray:
    ...


class bytes:
    ...


class dict:
    ...


class float:
    """
    Should only accept "nan", "+nan", "-nan", "inf", "+inf", and "-inf"
    other than numbers; raise a ValueError otherwise.

    Digits can also be Unicode (`Nd` class).
    """
    ...


class frozenset:
    ...


class list:
    ...


class range:
    ...


class set:
    ...


class str:
    ...


class tuple:
    ...
