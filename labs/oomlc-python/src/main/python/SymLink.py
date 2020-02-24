from FQN import FQN


class SymLink:
    def __init__(self, target: FQN, name: str):
        self.target = target
        self.name = name
