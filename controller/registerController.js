const User = require('../model/User');
const bcrypt = require('bcrypt');               

const signUpUser = async (req,res)=>{

    const { userName, password } = req.body                                 //retrieving  credentials 

    if(!userName||!password){
        return res.status(400).json({"message":"username and password are required."})
    }
    const duplicate = await User.findOne({userName : userName}).exec()              //if there's aleady a user with same name
    if(duplicate) return res.sendStatus(409)
    try{
        const hashedPassword = await bcrypt.hash(password,10)                       //encrypting password
        await User.create({
            userName: userName,
            password: hashedPassword
        })
        const result = await User.find()
        res.status(200).json(result)
    }catch(err){
        console.log(err)
    }
}

module.exports = {signUpUser}