const { Router } = require("express");
const router = Router();
const url = require("../constants.js");
const { MongoClient, ObjectID } = require("mongodb");
router.get("/users/user/:id/averageMark", (req, res) => {
  const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoClient.connect(function (err, client) {
    const db = client.db("project");
    const users = db.collection("users");
    const id = new ObjectID(req.params.id);
    users.find({ _id: id }).toArray(function (err, user) {
      const name = `${user[0].firstName} ${user[0].lastName}`;
      const average = user[0].marks.reduce((avg, value, _, { length }) => {
        return avg + value / length;
      }, 0);
      if (user.length) {
        res.status(200).json({ name: name, averageMark: average });
      } else {
        res.status(200).json({ name: null, averageMark: null });
      }
    });
  });
});

module.exports = router;
