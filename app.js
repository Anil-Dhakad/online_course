const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//import routes
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const skillRoutes = require("./routes/skills");
const courseRoutes = require("./routes/course");
const cartRoutes = require("./routes/cart");
const sectionRoutes = require("./routes/section");

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", skillRoutes);
app.use("/api", courseRoutes);
app.use("/api", cartRoutes);
app.use("/api", sectionRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
