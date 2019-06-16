const Express = require("express");
const BodyParser = require("body-parser");
const Minimist = require("minimist");

const fs = require("fs");

const args = Minimist(process.argv.slice(2));

const oomlcPath = args.oomlc;

if (!fs.existsSync(oomlcPath)) {
  throw new Error(`"${oomlcPath}" does not exist`);
}

const port = args.port || 2018;

const ooml = require(oomlcPath);

let server = Express();

let objects = new Map();

let objectAutoIncrement = 0;

function hydrateJSJSON (top) {
  let queue = [top];

  while (queue.length) {
    let cur = queue.shift();

    if (cur && typeof cur == "object") {
      Object.keys(cur).forEach(k => {
        let elem = cur[k];

        if (typeof elem == "string") {
          // TODO Use a better way, as this might collide with legit strings
          // TODO Probably use objects with special oomlc-server-specific fields instead
          if (/^__obj/.test(elem)) {
            cur[k] = objects.get(Number.parseInt(elem.slice(5), 10));
          } else if (/^__js/.test(elem)) {
            cur[k] = Function(`"use strict"; return (${elem.slice(4)});`);
          } else {
            // It's a string, don't need to add to queue
          }

        } else {
          queue.push(elem);
        }
      });
    }
  }
}

server.get("/new/:objectType", (req, res) => {
  let new_id = ++objectAutoIncrement;
  let new_obj;

  let builder_type = req.params.objectType;

  let constructor = ooml.Builder[builder_type];

  try {
    new_obj = new constructor();
  } catch (e) {
    res.send({
      error: {
        name: e.name,
        message: e.message,
      },
    });
    return;
  }

  new_obj.__builder_type = builder_type;

  objects.set(new_id, new_obj);

  res.send({
    id: new_id,
  });
});

server.get("/objects", (req, res) => {
  let data = {};
  for (let [key, value] of objects) {
    data[key] = value;
  }

  res.send(data);
});

server.post("/:objectId/:method", BodyParser.json(), (req, res) => {
  let id = Number.parseInt(req.params.objectId, 10);
  let method = req.params.method;
  let args = req.body;
  hydrateJSJSON(args);

  let obj = objects.get(id);

  let response_data = {
    error: false,
    result: null,
  };

  try {
    response_data.result = obj[method].apply(obj, args);
  } catch (e) {
    response_data.error = {
      name: e.name,
      message: e.message,
    };
  }

  res.send(response_data);
});

server.listen(port, () => {
  console.log(`oomlc-server started on port ${port}`);
});
