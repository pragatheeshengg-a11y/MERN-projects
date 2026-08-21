const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/users");

const auth = require("../middleware/auth");

router.post("/register",async (req,res)=>{
    try{
        const{email,password}=req.body

        const existing=await User.findOne({email});
        if(existing){
            return  res.status(401).json({
                message:"Already registered"
            })
        }
        const hash=await bcrypt.hash(password,10)

        await User.create({
            email:email,
            password:hash
        })
        res.status(201).json({
            message: "Registered Successfully"
        });
    }catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
})

router.post("/", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Wrong Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({ token });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

router.get("/profile",auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.json(user)
    }
    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
})
module.exports = router;