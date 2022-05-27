//http://localhost:1234
const express = require('express');
const app = express();
const PORT = 1234;

app.use(express.static(__dirname + '/dist'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})
// let server = app.listen(PORT, function(){
//     console.log(`App server is running on port ${PORT}`);
// });
   

   
   
   
