Utils.getEvalValue = codeStr => Function(`"use strict";return ${ codeStr.trim() || undefined }`)();
