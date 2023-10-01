const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const fs = require('fs');

const connectDB = require('./controllers/connectDB')
connectDB()

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // กำหนดเส้นทางสำหรับเทมเพลต

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ในที่นี้ให้อนุญาตให้ทุกๆ Origin เข้าถึงข้อมูล คุณสามารถกำหนดเป็น Origin ที่เฉพาะเฉพาะได้
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



fs.readdirSync('./routes')
  .forEach((r) => {
    if (r.endsWith('.js')) {
      const routePath = './routes/' + r;
      const route = require(routePath);
      app.use('/', route);
    }
  });



app.listen(3000);
