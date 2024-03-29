const express = require("express");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const app = express();
const path = require("path");
app.use(cookieParser());
app.use(methodOverride("_method"));
const port = process.env.PORT;

const router = require("./routes/client/index.route");
const Adminrouter = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
//Hiiển thị thông báo fontend
app.use(cookieParser("LUUDUCTHO"));
app.use(session({ secret: "LUUDUCTHO", cookie: { maxAge: 60000 } }));
app.use(flash());
///end

//
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//router///
Adminrouter(app);
router(app);
database.connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
