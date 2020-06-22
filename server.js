const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bp = require('body-parser');
const fs = require('fs');
const bodyParser = require('body-parser');

let appDb;

app.use(bodyParser.json()); 

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

// database handling
app.post('/js/db/', (req,res)=>{
    
    //add note to db and send new db as response
    if(req.body.type == 'add'){
        fs.readFile('js/db/noteDb.json', function(err,data){
            appDb = JSON.parse(data); 
            appDb.push(req.body.message);
            fs.writeFile('js/db/noteDb.json', JSON.stringify(appDb), function(){
                res.send(appDb);
            });
             
        })
        //remove note and send new db
    } else if(req.body.type == 'remove'){
        fs.writeFile('js/db/noteDb.json', JSON.stringify(req.body.message), function(){
            res.send(req.body.message);
        });
    }
});

app.use(cors())
app.use(express.static('./'));
app.use(bp.urlencoded({
    extended: false
 }));
 
 app.use(bp.json());

app.listen(3000, ()=>{ console.log('listen 3000')});