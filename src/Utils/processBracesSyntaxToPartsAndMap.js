let Utils_processBracesSyntaxToPartsAndMap = config => {
  let syntax = config.syntax;
  let onstaticpart = config.onstaticpart;
  let onbracepart = config.onbracepart;

  let parts = [];
  let map = Utils_createCleanObject();

  let toProcess = syntax;

  while (true) {
    let indexOfOpeningBrace = toProcess.indexOf("{{");
    let hasOpeningBrace = indexOfOpeningBrace > -1;

    let textBeforeParam = hasOpeningBrace ?
      toProcess.slice(0, indexOfOpeningBrace) :
      toProcess;

    // Don't need to create static text node if empty
    if (textBeforeParam) {
      let staticPartHandlerReturnValue = onstaticpart && onstaticpart(textBeforeParam);
      if (staticPartHandlerReturnValue && staticPartHandlerReturnValue.value !== undefined) {
        parts.push(staticPartHandlerReturnValue.value);
      } else {
        parts.push(textBeforeParam);
      }
    }

    if (!hasOpeningBrace) {
      break;
    }

    toProcess = toProcess.slice(indexOfOpeningBrace);

    // currentNode.toProcess is now:
    // "{{ whatever }}"
    // Therefore the index of the closing brace can't be less than 3
    let indexOfClosingBrace = toProcess.indexOf("}}");
    if (indexOfClosingBrace < 3) {
      throw SyntaxError(`Matching closing brace not found around:\n\n${ toProcess.slice(0, 200) }\n`);
    }
    // Remove opening and closing braces:
    // "{{ whatever }}" becomes " whatever "
    let param = toProcess.slice(2, indexOfClosingBrace);

    let mapKey = param;
    let partValue; // `undefined` default

    let bracePartHandlerReturnValue = onbracepart(param);
    if (bracePartHandlerReturnValue.key !== undefined) {
      mapKey = bracePartHandlerReturnValue.key;
    }
    if (bracePartHandlerReturnValue.value !== undefined) {
      partValue = bracePartHandlerReturnValue.value;
    }

    let partId = parts.push(partValue) - 1;
    if (!map[mapKey]) {
      map[mapKey] = [];
    }
    map[mapKey].push(partId);

    // Remove closing braces
    toProcess = toProcess.slice(indexOfClosingBrace + 2);
  }

  return Object.freeze({
    parts: parts,
    map: map,
  });
};
