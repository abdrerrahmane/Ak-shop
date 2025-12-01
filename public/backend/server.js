const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static("public")); // مهم باش الواجهة تخدم

app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} ✔`));
