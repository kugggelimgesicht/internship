const { Router } = require("express");
const router = Router();
const url = require("../constants.js");
const { MongoClient, ObjectID } = require("mongodb");
router.get("/users/user/:id", (req, res) => {
  const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoClient.connect(function (err, client) {
    const db = client.db("project");
    const users = db.collection("users");
    const id = new ObjectID(req.params.id);
    users.find({ _id: id }).toArray((err, user) => {
      if (user.length) {
        res.status(200).json({ user: user });
      } else {
        res.status(200).json({ user: null });
      }
    });
  });
});
module.exports = router;
