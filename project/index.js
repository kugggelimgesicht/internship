const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ObjectID } = require("mongodb");
const path = require("path");
const app = express();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`server is running on port ${PORT}`);
});
const url =
  "mongodb+srv://darya:6LSyEcOFCIQPjIyn@cluster0.ryva2.mongodb.net/<dbname>?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect(function (err, client) {
  const db = client.db("project");
  const collection = db.collection("users");

  app.get("/users", (req, res) => {
    collection.find({}).toArray(function (err, users) {
      res.status(200).json({ users: users });
    });
  });
  app.get("/users/search/:name", (req, res) => {
    const name = req.params.name.toLowerCase();

    collection.find({}).toArray(function (err, users) {
      console.log(users);
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
  app.get("/users/user/:id", (req, res) => {
    const id = new ObjectID(req.params.id);
    collection.find({ _id: id }).toArray(function (err, user) {
      if (user.length) {
        res.status(200).json({ user: user });
      } else {
        res.status(200).json({ user: null });
      }
    });
  });
  app.get("/users/user/:id/averageMark", (req, res) => {
    const id = new ObjectID(req.params.id);
    collection.find({ _id: id }).toArray(function (err, user) {
      const name = `${user[0].firstName} ${user[0].lastName}`;
      const average = user[0].marks.reduce(function (
        avg,
        value,
        _,
        { length }
      ) {
        return avg + value / length;
      },
      0);
      if (user.length) {
        res.status(200).json({ name: name, averageMark: average });
      } else {
        res.status(200).json({ name: null, averageMark: null });
      }
    });
  });
});
//6LSyEcOFCIQPjIyn
//mongodb+srv://darya:6LSyEcOFCIQPjIyn@cluster0.ryva2.mongodb.net/<dbname>?retryWrites=true&w=majority
