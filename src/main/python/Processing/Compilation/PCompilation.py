import os
import re
from typing import List, Tuple, Optional

from Error.DependencyError import DependencyError
from Error.DependencyNotFoundError import DependencyNotFoundError
from Processing.Builder.BuilderMirror import BuilderMirror
from Processing.Compilation.PClass import PClass
from Processing.Compilation.PFile import PFile
from Processing.FQN import FQN


class PCompilation:
    def __init__(self, search_path: List[str]):
        self.search_path = search_path

        self.known_files = {}

        # Don't need load order; ooml loads modules asynchronously and out-of-order
        self.modules = {}
        self.anon_modules = []

    def _resolve_fqn(self, fqn: FQN):
        cur = self.modules
        for i in range(len(fqn)):
            c = fqn[i]
            if c not in cur:
                raise NameError(f'Non-existent component "{fqn[:i]}"')
            cur = cur[c]
        return cur

    @staticmethod
    def fully_qualify_import(ref: str, source: PFile) -> FQN:
        if ref.startswith("."):
            # Relative import
            matches = re.compile(r'^(\.+)(.*)$').match(ref)

            upper_levels = len(matches[1]) - 1
            parts = matches[2].split(".")

            base_fqn = source.fqn

            for _ in range(upper_levels):
                try:
                    base_fqn = base_fqn.parent()
                except NameError:
                    raise DependencyError(f'"{ref}" exceeds module', source)

            base_fqn.extend(parts)

            return base_fqn

        return FQN(ref.split("."), None)

    def find_file_for_import(self, imp: FQN) -> Optional[Tuple[str, List[str]]]:
        """
        Tries to find the file containing the import $ref.
        If $ref is a relative import, search relative to $source.
        The absolute import search algorithm goes as follows:
            1. Go through each path in $self.search_path in order.
            2. For each component of the import, try to access a folder called it at $path.
                2i. If successful, replace $path with the subdirectory's path.
                2ii. Continue until no matching subdirectory exists or all components have been exhausted.
            3. If there are no more components, go to the next search path (i.e. current has failed).
            4. If there exists a file called the same as the next component with ".py", return that file.
            5. Otherwise, try the next search path.
            6. If all search paths have been exhausted, raise a DependencyNotFoundError error.
        This algorithm breaks on first possible match and is depth-first, so may not be accurate.
        However, there should be no collisions of FQNs anyway.
        """
        for prefix in self.search_path:
            rem_parts = list(imp.components)
            path = os.path.normpath(prefix).rstrip(os.sep)

            while os.path.isdir(path) and rem_parts:
                path += os.sep + rem_parts.pop(0)

            if not rem_parts:
                continue

            path += os.sep + rem_parts.pop(0) + ".py"
            if os.path.isfile(path):
                return path, rem_parts
        else:
            return None

    def get_known_file(self, fqn: FQN) -> PFile:
        return self.known_files.get(fqn, None)

    def set_file(self, fqn: FQN, file: PFile):
        self.known_files[fqn] = file

    def declare_class(self, fqn: FQN):
        parent = self._resolve_fqn(fqn.parent())
        name = fqn.base()

        # Random note:
        # It's not possible for a namespace to exist under a class,
        # so if $parent is a namespace, no ancestor is a class

        if name in parent:
            raise NameError(f'"{fqn}" is already taken')

        cls = PClass()
        parent[name] = cls
        return cls

    def add_class(self, cls: BuilderMirror):
        # TODO
        ...
