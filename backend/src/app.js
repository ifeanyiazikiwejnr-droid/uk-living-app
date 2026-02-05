const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/accommodations", require("./routes/accommodations"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/starter-pack", require("./routes/starterPack"));
app.use("/api/tourism", require("./routes/tourism"));
app.use("/api/schools", require("./routes/schools"));
app.use("/api/buddy-directory", require("./routes/buddyDirectory"));
app.use("/api/buddies", require("./routes/buddies"));
app.use("/api/matching", require("./routes/matching"));
app.use("/api/me", require("./routes/me"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/uploads", require("./routes/uploads"));
app.use("/api/buddy-page", require("./routes/buddyPage"));
app.use("/api/buddy", require("./routes/buddyMe"));


app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

module.exports = app;
