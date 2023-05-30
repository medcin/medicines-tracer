const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./public/back-end/routes/routing.js");
const pool = require("./public/back-end/db.js");
const { send } = require('process');



const app = express();
/*
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
*/


// app uses
app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser()); // this allow u to manage reqs
app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages

// post pages


router.post("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/welcome.html"));
});
router.post("/signup", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, "/public/front-end/html/signup.html"));
});
router.post("/mymeds", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/medsTable.html"));
});



//===================




router.post("/otp", async (req, res) => {

try {
  console.log("otp");
  console.log(req.body);
  sendJson(req.body);
  /* User registeration info are fetched successfully
  We just need to send it to the database*/
  //const newUser = await pool.query("INSERT INTO public.users (name, phone, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.body.fullName, req.body.number, req.body.email, req.body.password, req.body.userName])
  res.sendFile(path.join(__dirname, "/public/front-end/html/otp.html"));
} catch (error) {
    console.error(error.message);
}
});

router.post("/main", (req, res) => {
  try {
    const { otp } = req.body;
    console.log("main");
    sendJson(req.body);
  
    //tDB.otp = JSON.parse(req.body.otp);
    //sendJson(req.body);
    /* User registeration info are fetched successfully
    We just need to send it to the database*/
    
    res.sendFile(path.join(__dirname, "/public/front-end/html/main.html"));
  } catch (error) {
      console.error(error.message);
  }
  });

router.post("/home", (req, res) => {
  console.log("hooooommme");
  sendJson(req.body);

  //sendJson(req.body);
  /* User login info are fetched successfully
  We just need to verify it*/
  const {} = req.body;
  res.sendFile(path.join(__dirname, "/public/front-end/html/home.html"));

  /*
router.post("/user", (req, res) => {
  console.log(req.body);
  /* insted of doing it like
  const x = req.body.x
  x is the attrubite name
  such as adress or somthing //*
  const {} = req.body;
  res.json({ msg: "I'm here" });
  */

});

let listeport = 5500;
app.listen(listeport, () => {
  console.log("hi im on port " + listeport);
});






function sendJson(json) {

  
  const filePath = 'public/back-end/tDB.json';
  fs.appendFile(filePath, JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}:`, err);
      return;
    }
    console.log(`Data saved successfully to ${filePath}`);
  });

}




/*

function sendJson(json){
  fs.writeFile('public\\back-end\\tDB.json', JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
*/
/*
httpServer.listen(80);
httpsServer.listen(443);*/

