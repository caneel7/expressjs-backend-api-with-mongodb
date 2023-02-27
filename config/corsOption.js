const allowedOrigins = require('./allowedOrigins');

const corsOption = {
    origin:(origin,callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin ){   //if domain is in allowed then it would return an index. remove !origin after production
            callback(null,true)
        }else{
            callback(new Error("Not Allowed By CORS"))       //if domain is not allowed throw error
        }
    },
    optionsSuccessCode: 200
}

module.exports = corsOption