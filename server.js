const express = require("express");
const e_app = express();
const path = require("path");
const router = express.Router();
e_app.listen(8080, ()=>{console.log("hi");})
e_app.use(express.static("public"));







router.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"public/front-end/home.html"));
})

e_app.use("/", router);