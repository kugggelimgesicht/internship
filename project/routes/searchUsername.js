const { Router } = require("express");
const router = Router();
const url = require("../constants.js");
const { MongoClient } = require("mongodb");
router.get("/users/search/:name", (req, res) => {
  const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoClient.connect(function (err, client) {
    const db = client.db("project");
    const users = db.collection("users");
    const name = req.params.name.toLowerCase();

    users.find({}).toArray((err, users) => {
      const usersArr = [];
      users.forEach((user) => {
        if (name.includes(" ")) {
          fullName = name.split(" ");

          if (
            user.firstName.toLowerCase().includes(fullName[0]) &&
            user.lastName.toLowerCase().includes(fullName[1])
          ) {
            usersArr.push(user);
          }
        } else if (
          user.firstName.toLowerCase().includes(name) ||
          user.lastName.toLowerCase().includes(name)
        ) {
          usersArr.push(user);
        }
      });
      if (usersArr.length) {
        res.status(200).json({ user: usersArr });
      } else {
        res.status(200).json({ user: null });
      }
    });
  });
});

module.exports = router;
