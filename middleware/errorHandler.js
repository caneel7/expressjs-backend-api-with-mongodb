const {logEvents} = require('./logEvents')
const path = require('path')

const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}`,'errorLogs.txt');
    res.status(500).send(err.message)
    next();
}

module.exports = errorHandler;