const UserModels = require('../Models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const cookieOptions = {
    httpOnly: true,
    secure: true, 
    sameSite: 'None'

};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExist = await UserModels.findOne({ email });

        if (isExist) {
            return res.status(400).json({ error: "Already have an account with this email or roll." });
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        

        const user = new UserModels({ name, email, password : hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', success: "yes", data: user });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const isExist = await UserModels.findOne({ email });
        
        if(isExist && await bcryptjs.compare(password,isExist.password)){
            
            const token = jwt.sign({ userId: isExist._id }, process.env.JWT_SECRET);

            res.cookie('token',token,cookieOptions)

            return res.status(200).json({ message: 'Logged in successfully', success: "true", user : isExist ,token });
        }else{
            return res.status(400).json({ error: 'Invalid credentials' });
        }

    }catch(err){
        console.log(err)
        res.status(500).json({
            error: "Something Went Wrong",
            issue: err.message
        })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
}