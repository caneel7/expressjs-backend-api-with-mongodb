const User = require('../model/User');

const getAllUser = async (req,res)=>{

    const users = await User.find()
    if(users.length === 0){                                                     //if users' length is 0
        return res.json({"message":"no users registerd"})
    }else{
        res.json(users)
    }
}

const deleteUser = async (req,res)=>{

    const user = await User.findOne({_id : req.body.id}).exec()                          //find user with id
    if(!user) return res.status(400).json({"message":"user not found"})
    await User.deleteOne({_id : req.body.id})                                           //deleting user with id
    const resultant = await User.find()
    res.status(200).json(resultant)
}

const getUser = async (req,res)=>{

    const user = await User.findOne({_id : req.params.id})                           //find user with id 
    if(!user) return res.status(400).json({"message":"user not found"})
    res.json(user)
}

module.exports = {
    getAllUser,
    deleteUser,
    getUser
}