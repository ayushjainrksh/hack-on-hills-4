var express = require('express'),
    app = express(),
    PORT = 8000 | process.env.PORT

app.set('view engine','ejs');
app.use(express.static('assets'))

app.get('/', function(req, res){
    res.render('home')
})

app.get('/booths/nearme', function(req, res){
    res.render('nearme')
})

app.listen(PORT, function(err){
    if(err)
        console.log(err)
    else
        console.log('Server has started...')
})