const { Router } = require("express");
const url = require("../constants.js");
const router = Router();
const { MongoClient } = require("mongodb");
router.get("/users", (req, res) => {
  const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoClient.connect(function (err, client) {
    const db = client.db("project");
    const users = db.collection("users");
    users.find({}).toArray((err, users) => {
      res.status(200).json({ users: users });
    });
  });
});

module.exports = router;
