import express from "express";
const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("Signup Page");
})

router.get("/login",(req,res)=>{
    res.send("login Page");
})

router.get("/logout",(req,res)=>{
    res.send("logout Page");
})

export default router;

