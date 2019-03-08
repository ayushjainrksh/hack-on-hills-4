var express = require('express'),
    app = express(),
    PORT = 8000 | process.env.PORT

app.use(express.static('assets'))

app.get("/", function(req, res){
    res.send("Home page")
})

app.listen(PORT, function(err){
    if(err)
        console.log(err)
    else
        console.log("Server has started...")
})