const verifyRoles = (...allowedRoles)=>{                            //...allowedroles multiple paramters
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(403)
        const rolesArray = [...allowedRoles]
        console.log(req.roles)
        console.log(rolesArray)
        const result = req.roles.map((role)=>rolesArray.includes(role)).find(val=> val === true)        //if rolesarray incles role from req.roles then find one
        if(!result) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRoles;