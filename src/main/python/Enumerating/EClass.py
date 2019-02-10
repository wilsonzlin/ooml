import ast
from typing import Union, List, Optional

from Enumerating.EContext import EContext
from SymLink import SymLink
from Pos import Pos
from FQN import FQN


class EClass:
    def __init__(self, *, fqn: FQN, position: Pos, context: Optional[EContext],
                 raw_parent: Optional[str], raw_body: List[Union[ast.AST, SymLink]],
                 raw_decorators: List[ast.AST]):
        self.fqn = fqn
        self.position = position
        # $ctx can be None if file (module)
        self.context = context

        self.raw_parent = raw_parent
        self.raw_body = raw_body
        self.raw_decorators = raw_decorators
