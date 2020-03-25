const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const puretext = require('puretext');
var db; 
mongoose.connect('mongodb://localhost:27017/NMS',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const router = require('./routers/router');
const govrouter = require('./routers/govrouter');

let text = {
    toNumber : '+918822918895',
    fromNumber : '+18735060007',
    smsBody : 'Sending Sms Using Node js',
    apiToken : 'myqqss'
}
puretext.send(text,(err,response)=>{
    if(err)
        console.log(err);
    else
        console.log(response);
})
const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json())

const publicDirectoryPath = path.join(__dirname,'../public')

// app.set('view engine','hbs');
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'../template/views'));

app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000;

app.use('/ngo',router);
app.use('/gov',govrouter);



app.listen(port, () => {
    console.log('Server is up on port : '+ port)
})