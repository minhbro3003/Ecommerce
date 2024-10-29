const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Cross-Origin Resource Sharing) là một cơ chế bảo mật trong trình duyệt mà ngăn không cho các trang web từ một nguồn (origin) khác truy cập tài nguyên từ một nguồn khác.
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); // Lưu trữ cookie
routes(app);

mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connected to MongoDB! ");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB   - ", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
