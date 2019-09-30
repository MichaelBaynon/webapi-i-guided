const express = require("express");

const hubsModel = require("./data/hubs-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world!");
});

server.get("/hubs", (req, res) => {
  hubsModel
    .find()
    .then(hubs => {
      res.send(hubs);
    })
    .catch(error => {
      console.log(error);
    });
});

server.post("/hubs", (req, res) => {
  const hubData = req.body;

  if(!hubData.name) {
      res.status(400).json({message: 'we need a name'})
  } else {

  

  hubsModel
    .add(hubData)

    .then(hub => {
      res.json(hub);
    })
    .catch(error => {
      res.json({ message: "ERROR SAVING THE HUB" });
    });
}
});

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;
  hubsModel
    .remove(id)
    .then(hub => {
      res.json(hub);
    })
    .catch(error => {
      res.json({ message: "ERROR deleting THE HUB" });
    });
});

server.put('/hubs/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body

    hubsModel.update(id, changes)
    .then(hub => {
        res.json(hub);
      })
      .catch(error => {
        res.json({ message: "ERROR updating THE HUB" });
      });
})

const port = 8000;

server.listen(port, () => console.log("api is listening on port 8000"));
