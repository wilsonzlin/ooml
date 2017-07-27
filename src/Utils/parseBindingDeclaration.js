Utils.parseBindingDeclaration = declaration => {
    let posOfLeftBrace;
    let toProcess = declaration;
    let dynamicParts = [];
    let localPropertyToPartMap = Utils.createCleanObject();
    while ((posOfLeftBrace = toProcess.indexOf('{')) > -1) {
        let upToBrace = toProcess.slice(0, posOfLeftBrace);
        dynamicParts.push(upToBrace);

        toProcess = toProcess.slice(posOfLeftBrace);
        let posOfRightBrace = toProcess.indexOf('}');
        if (posOfRightBrace == -1) {
            throw new SyntaxError(`Malformed binding syntax: "${ declaration }"`);
        }
        // param === "{{ some.param }}"
        let param = toProcess.slice(0, posOfRightBrace + 2);
        let matches;
        if (!(matches = /^{{ this\.([a-zA-Z0-9_]+) }}$/.exec(param))) {
            throw new SyntaxError(`Malformed binding syntax: "${ declaration }"`);
        }
        let localProperty = matches[1];
        let partId = dynamicParts.push("") - 1;
        if (!localPropertyToPartMap[localProperty]) {
            localPropertyToPartMap[localProperty] = [];
        }
        localPropertyToPartMap[localProperty].push(partId);

        toProcess = toProcess.slice(posOfRightBrace + 2);
    }
    if (toProcess.length) {
        dynamicParts.push(toProcess);
    }

    let isDynamic = dynamicParts.length > 1;
    if (isDynamic) {
        return {
            isDynamic: true,
            parts: dynamicParts,
            propertyToPartMap: localPropertyToPartMap,
        };
    } else {
        return {
            isDynamic: false,
            keypath: dynamicParts[0],
        };
    }
}