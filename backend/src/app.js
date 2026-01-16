const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/accommodations", require("./routes/accommodations"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/starter-pack", require("./routes/starterPack"));
app.use("/api/tourism", require("./routes/tourism"));
app.use("/api/schools", require("./routes/schools"));



app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

module.exports = app;
