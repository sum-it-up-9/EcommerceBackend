const jwt = require('jsonwebtoken');
const  JWT_SECRET  = 'abc123gajfjj3j4f';
const User=require('../models/user-schema.js');

const generateAccessToken = (user) => {
    return jwt.sign({ userEmail: user.email }, JWT_SECRET, { expiresIn: '2h' }); // Adjust the expiration time as needed
};


const userSignup= async (req,res) =>{
    try{
        const existingUser=await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(401).json({message:'user with email id already exists!'});
        }
        const user=new User(req.body);
        await user.save();
        return res.status(200).json({message:user});

    }catch(error){
        console.log('error creating user: ',error);
        return res.status(500).json({message:error.message});
    }

};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = password=== existingUser.password;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const accessToken = generateAccessToken(existingUser);
        return res.status(200).json({ message: 'Login successful', Userdata:existingUser,accessToken });
s
    } catch (error) {
        console.log('Error while logging user: ', error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports={userSignup,userLogin};