import requests

from Error.BuildError import BuildError

_PORT = 2018
_ORIGIN = f"http://localhost:{_PORT}"


class BuilderMirror:
    @staticmethod
    def _handle_response(res: requests.Response):
        json = res.json()
        if json.error:
            raise BuildError(json.error.name, json.error.message)

        return json

    def __init__(self, builder_type: str):
        res = self._handle_response(requests.get(f"{_ORIGIN}/new/{builder_type}"))
        self.id = res.id

    def __getattr__(self, item):
        def method(*args):
            res = self._handle_response(requests.post(f"{_ORIGIN}/{self.id}/{item}", data=args))
            return res.result

        return method
