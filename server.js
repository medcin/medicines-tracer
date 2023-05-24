const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./public/back-end/routes/routing.js");
const hbs = require("express-handlebars");
const app = express();


app.set("views", path.join(__dirname, "/layout/main"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname:"hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "./layout/main"),
    partialsDir: path.join(__dirname, "./layout/header&footer"),
  })
);
// app uses
app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
app.use(bodyParser()); // this allow u to manage reqs
app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages

// post pages

router.post("/user", (req, res) => {
  console.log(req.body);
  /* insted of doing it like
  const x = req.body.x
  x is the attrubite name
  such as adress or somthing*/
  const {} = req.body;
  res.json({ msg: "I'm here" });
});

app.listen(5500, () => {
  console.log("hi");
});
