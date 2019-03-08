require('dotenv').config()

var express = require('express'),
    app = express(),
    PORT = 4000 | process.env.PORT

app.set('view engine','ejs');
app.use(express.static('assets'))

app.get('/', function(req, res){
    res.render('home')
})

app.get('/booths/nearme', function(req, res){
    res.render('nearme',{API_KEY : process.env.API_KEY})
})

app.listen(PORT, function(err){
    if(err)
        console.log(err)
    else
        console.log('Server has started...')
})