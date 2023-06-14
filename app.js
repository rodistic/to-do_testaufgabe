let express = require('express'); 
let app = express();
let path = require("path");


app.use(express.static(__dirname + '/resources'));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/resources/index.html'));
});

app.listen(80);
console.log("Running at Port 80");