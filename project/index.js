const express = require("express");
const path = require("path");
const app = express();
const usersRoute = require("./routes/users");
const userIdRoute = require("./routes/searchUserId");
const usernameRoute = require("./routes/searchUsername");
const userAvgMarkRoute = require("./routes/userAvgMark");
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use(usersRoute);
app.use(userAvgMarkRoute);
app.use(usernameRoute)
app.use(userIdRoute)

