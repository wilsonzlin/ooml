from typing import Optional

from Processing.PType import PType


class PParameter:
    def __init__(self, name, *, type: Optional[PType] = None, default_value=None):
        self.name = name
        self.type = type
        self.default_value = default_value
