from typing import Optional, List, Union, Tuple


class FQN:
    def __init__(self,
                 base: Optional[Union['FQN', List[str], Tuple[str, ...]]],
                 name: Optional[str]):
        if isinstance(base, (list, tuple)):
            components = list(base)
        elif isinstance(base, FQN):
            components = list(base.components)
        else:
            components = []

        if name is not None:
            components.append(name)

        self.components = tuple(components)

    def parent(self) -> 'FQN':
        if len(self.components) <= 1:
            raise NameError("No parent available")
        return FQN(self.components[:-1], None)

    def base(self) -> str:
        return self.components[-1]

    def extend(self, other: Union['FQN', List[str]]):
        return FQN(list(self.components) + other, None)

    def __add__(self, other):
        return FQN(self, other)

    def __str__(self):
        return ".".join(self.components)

    def __eq__(self, other):
        if not isinstance(other, FQN):
            raise NotImplementedError()

        return self.components == other.components

    def __iter__(self):
        return iter(self.components)

    def __len__(self):
        return len(self.components)

    def __getitem__(self, item):
        if isinstance(item, slice):
            return FQN(self.components[item], None)
        return self.components[item]

    def __hash__(self):
        return hash(self.components)
