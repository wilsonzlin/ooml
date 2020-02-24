from typing import List, Dict, Optional

from Processing.PParameter import PParameter


class PFunction:
    def __init__(self, *, name: str,
                 pos_params: List[PParameter], pos_collect_param: Optional[str] = None,
                 kw_params: Optional[Dict[str, PParameter]] = None, kw_collect_param: Optional[str] = None,
                 is_instance: bool = False, is_static: bool = False, is_class: bool = False):
        self.name = name

        # Map from parameter name to its position
        # Keyword-only parameters have None as their position
        self.params = {name: pos for pos, name in enumerate(pos_params)}
        if kw_params is not None:
            for name in kw_params.keys():
                self.params[name] = None

        self.pos_params = pos_params
        self.kw_params = kw_params

        # $pos_collect_param must be a non-empty string
        # The bare * should be processed by compiler, and not handled here
        self.pos_collect_param = pos_collect_param
        self.kw_collect_param = kw_collect_param

        self.is_instance = is_instance
        self.is_static = is_static
        self.is_class = is_class
