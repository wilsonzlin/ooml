class Annotation:
    """
    Annotations are a separate class because:

    - They should not be called regularly.
    - They need to be handled specially by the compiler.
    - They cannot be created by the user.
    """

    def __init__(self, name: str):
        self.name = name
