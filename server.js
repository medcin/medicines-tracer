const express = require("express");
const e_app = express();
const path = require("path");
const router = express.Router();
e_app.listen(5500, ()=>{console.log("hi");})
e_app.use(express.static("public"));






router.get("/index", (req,res)=>{
    res.sendFile(path.join(__dirname,"public/front-end/index.html"))
})
router.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"public/front-end/home.html"));
});

router.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/front-end/404.html"))

})


e_app.use("/", router);