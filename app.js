require('dotenv').config()

var express = require('express'),
    app = express(),
    PORT = 4000 | process.env.PORT
    fs = require('fs');
    csv = require('csv-parse');

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, '/assets/database/hamirpur_polling_booth.tsv');

app.set('view engine','ejs');
app.use(express.static('assets'))

API_KEY=process.env.API_KEY
app.use(function(req, res, next){
  res.locals.API_KEY = req.API_KEY;
  next();
});


// ======================
//        ROUTES
// ======================
app.get('/', function(req, res){
    res.render('home')
})

app.get('/booths/search',function(req, res){
  res.send("Page coming soon!");
})

app.get('/booths/nearme', function(req, res){
    var arr = []
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) 
        console.log(err);
      else {
        res.render('nearme',{API_KEY : process.env.API_KEY, arr:data})
        res.end();
      }
  });   
})

app.get('/constituencies', function(req, res){
  res.render('constituencies')
})

app.get('/parties', function(req, res){
  res.render('parties')
})

app.listen(PORT, function(err){
    if(err)
        console.log(err)
    else
        console.log('Server has started...')
})