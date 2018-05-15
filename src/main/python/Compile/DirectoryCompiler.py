from os import listdir
from os.path import abspath, isdir, isfile, join
from typing import List

from Error.InvalidFileError import InvalidFileError
from Error.InvalidFolderError import InvalidFolderError
from Processing.Processing import Processing


class DirectoryCompiler:
    @staticmethod
    def compile(*, proc: Processing, parts: List[str], raw_dir_path: str, is_ooml_dir: bool):
        dir_path = abspath(raw_dir_path)

        files = []
        subdirs = []

        for dir_entry in listdir(dir_path):
            subpath = join(dir_path, dir_entry)

            if isfile(subpath):
                if not subpath.endswith(".py"):
                    raise InvalidFileError(subpath)
                files.append(dir_entry)

            elif isdir(subpath):
                subdirs.append(dir_entry)

            else:
                # Silently ignore
                pass

        if files and subdirs and is_ooml_dir:
            raise InvalidFolderError(dir_path)

        for f in files:
            subpath = join(dir_path, f)
            parts_count = len(parts)

            if is_ooml_dir:
                if parts_count == 0:
                    # Anonymous class
                    ...

                elif parts_count == 1:
                    # Class in anonymous namespace
                    # TODO Namespace name is ignored, so ensure it's __anonns1 or something
                    # TODO Ensure anonns name is otherwise an invalid ns name, to prevent mixups
                    ...

                elif parts_count == 2:
                    # Class in anonymous module
                    # TODO Not allowed
                    ...

                elif parts_count == 3:
                    # Class in group
                    ...

                else:
                    raise InvalidFileError(subpath)

            else:
                if parts_count == 0:
                    # a.py
                    ...

                elif parts_count == 1:
                    # a/b.py
                    ...

                elif parts_count == 2:
                    # a/b/c.py
                    ...

                elif parts_count == 3:
                    # a/b/c/d.py
                    ...

                else:
                    raise InvalidFileError(subpath)

        for d in subdirs:
            subpath = join(dir_path, d)
            DirectoryCompiler.compile(
                proc=proc,
                parts=parts + [d],
                raw_dir_path=subpath,
                is_ooml_dir=is_ooml_dir)
