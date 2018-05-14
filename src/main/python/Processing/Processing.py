from Processing.DependencyYielder import DependencyYielder


class Processing:
    def __init__(self, dep_yielder: DependencyYielder):
        self.dep_yielder = dep_yielder
        # Don't need load order; ooml loads modules asynchronously and out-of-order
        self.fq_classes = {}
        # Anonymous namespaces don't have names
        self.anonymous_namespaces = {}
        self.anonymous_classes = {}
