const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");

app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
app.use(bodyParser.json({limit: '200mb'}));
let HRPInfo = {};
try {
    const jsonString = fs.readFileSync("./HRPInfo.json");
    HRPInfo = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
    return;
}

app.get("/locations", (req, resp) => {

    

    resp.status(200).send("Locations"); 
});
app.get("/name_search", (req, resp) => {
    resp.status(200).send("Name"); 
});
app.get("/specialization", (req, resp) => {
    resp.status(200).send("specialization"); 
});
app.use( (req,res) => { res.status(404).send("Unknown request"); } )
app.listen(8080, ()=> {console.log('On port 8080');})