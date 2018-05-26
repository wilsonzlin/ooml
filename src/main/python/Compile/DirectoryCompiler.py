from os import listdir
from os.path import isdir, isfile, join

from Compile.FileCompiler import FileCompiler
from Processing.Compilation.PCompilation import PCompilation
from Processing.DependencyPath import DependencyPath
from Processing.FQN import FQN


class DirectoryCompiler:
    @staticmethod
    def compile(proc: PCompilation, namespace: FQN, dir_path: str):
        for dir_entry in listdir(dir_path):
            subpath = join(dir_path, dir_entry)

            if isfile(subpath):
                if subpath.endswith(".py"):
                    FileCompiler.compile(proc, FQN(namespace, dir_entry[:-3]), subpath, DependencyPath([]))

            elif isdir(subpath):
                DirectoryCompiler.compile(
                    proc=proc,
                    namespace=FQN(namespace, dir_entry),
                    dir_path=subpath)
