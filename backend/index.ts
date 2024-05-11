const express = require("express");
const cors = require("cors");

const app = express();
const PORT: number = 3001;
app.use(cors());

// @ts-ignore
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
