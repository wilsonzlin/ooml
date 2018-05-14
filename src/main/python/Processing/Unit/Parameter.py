from typing import Optional

from Processing.Unit.Type import Type


class Parameter:
    def __init__(self, name, *, type: Optional[Type] = None, default_value=None):
        self.name = name
        self.type = type
        self.default_value = default_value
