from typing import Optional, List, Dict

from Processing.Compilation.PFile import PFile


class PClass:
    def __init__(self, container: Optional['PClass']):
        self.dependencies: List[PFile] = []
        self.nested_classes: Dict[str, 'PClass'] = {}
        self.container: Optional['PClass'] = container

    def add_dependency(self, file: PFile):
        self.dependencies.append(file)

    def __contains__(self, item: str):
        return item in self.nested_classes

    def __getitem__(self, item: str):
        return self.nested_classes[item]

    def __setitem__(self, key: str, value: 'PClass'):
        if not isinstance(key, str):
            raise TypeError(f'Class name must be a string')

        if not isinstance(value, PClass):
            raise TypeError(f'Class is not an instance of PClass')

        self.nested_classes[key] = value
