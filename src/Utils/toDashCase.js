Utils.toDashCase = str => dashCaseCache[str] || (dashCaseCache[str] = str.replace(/^[a-z]+|(?!^)(?:[A-Z][a-z]*)/g, match => match.toLowerCase() + '-').slice(0, -1));
