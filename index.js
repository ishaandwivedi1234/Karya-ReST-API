const express = require("express");
const app = express();
const users = require("./routes/users");
const auth = require("./auth/auth");
const tasks = require("./routes/tasks");
const home = require("./routes/home");
require("./loging/loging")();
// require("./db/db")();
app.use(express.json());
app.use("/", home);

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listning to port ${port}`));
