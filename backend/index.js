const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));
app.use(helmet());

// Define Routes
app.use("/", require("./routes/api/scheduler"));

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
