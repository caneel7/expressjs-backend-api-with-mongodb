require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler'); 
const corsOption = require('./config/corsOption');       //restricting the access of resource
const verifyJWT = require('./middleware/verifyJWT');   //custom middleware for verifing jwt 

const PORT = process.env.PORT || 3200;

//connecting to database
connectDB();

//custom middleware for logging request 
app.use(logger)

//cross origin resource sharing
app.use(cors(corsOption))

//middleware for urlencoded data ie form data
app.use(express.urlencoded({extended:false}));

//middleware for json data
app.use(express.json());

//third part middleware for parsing cookies we send in http request
app.use(cookieParser());

//middleware for static files
app.use(express.static(path.join(__dirname,'public')));

//rotuer for root directory or index
app.use('/',require('./routes/root'));

app.use('/register',require('./routes/register'));                 //registering our users
app.use('/auth',require('./routes/authenticate'));               //verifing our login credentials and sending jwts
app.use('/refresh',require('./routes/refresh'));               //refresh out access token
app.use('/logout',require('./routes/logout'));               //removing our refresh token 

app.use(verifyJWT);
app.use('/users',require('./routes/api/users'));             //users api 
app.use('/employees',require('./routes/api/employees'));    //employees api 


//for a path that doesnt exist
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'));
});

//custom middleware for logging error and handlign error
app.use(errorHandler);

//if connection to database is successfull then run server
mongoose.connection.once('open',()=>{
    console.log(`Database Connected`)
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
});