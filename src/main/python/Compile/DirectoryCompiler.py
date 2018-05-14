from os import listdir
from os.path import abspath, isdir, isfile, join
from typing import List

from Error.InvalidFileError import InvalidFileError
from Processing.Processing import Processing


class DirectoryCompiler:
    @staticmethod
    def compile(*, proc: Processing, parts: List[str], raw_dir_path: str, is_sources_root: bool):
        dir_path = abspath(raw_dir_path)

        for dir_entry in listdir(dir_path):
            subpath = join(dir_path, dir_entry)

            if isfile(subpath):
                if not subpath.endswith(".py"):
                    raise InvalidFileError(subpath)

                parts_count = len(parts)

                if is_sources_root:
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

            elif isdir(subpath):
                DirectoryCompiler.compile(
                    proc=proc,
                    parts=parts + [dir_entry],
                    raw_dir_path=subpath,
                    is_sources_root=is_sources_root)

            else:
                # Silently ignore
                pass
