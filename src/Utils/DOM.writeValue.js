Utils.DOM.writeValue = (name, nodes, value, customHtml) => {
    let customDom;
    let useCustomHtml = Utils.typeOf(customHtml, TYPEOF_STRING);

    // customHtml may be empty, which means that custom HTML is still wanted (i.e. don't write text value), but remove any current custom HTML
    if (useCustomHtml) {
        let dom = document.createElement('div');
        dom.innerHTML = customHtml.trim();
        if (dom.children.length > 1) {
            throw new SyntaxError(`Custom HTML has more than one root element`);
        }
        customDom = dom.children[0];
    }

    nodes.forEach(node => {
        if (node instanceof Text) {

            // Delete any custom HTML, regardless if using or not
            if (node.nextSibling && node.nextSibling[OOML_DOM_PROPNAME_ISCUSTOMHTML]) {
                delete node.nextSibling[OOML_DOM_PROPNAME_ISCUSTOMHTML];
                node.parentNode.removeChild(node.nextSibling);
            }

            if (useCustomHtml) {

                if (customDom) {
                    let customDomDuplicated = customDom.cloneNode(true);
                    customDomDuplicated[OOML_DOM_PROPNAME_ISCUSTOMHTML] = true;

                    node.parentNode.insertBefore(customDomDuplicated, node.nextSibling);
                }

                node.data = '';

            } else {

                node.data = value;

            }
        } else { // Must be attribute
            let formatStr = node.valueFormat;

            node.valueFormatMap.forEach(offset => {
                formatStr[offset] = value;
            });
            OOMLNodesWithUnwrittenChanges.add(node);
        }
    });

    OOMLWriteChanges();
};
