require('dotenv').config()

var express = require('express'),
    app = express(),
    PORT = 4000 | process.env.PORT
    fs = require('fs');
    csv = require('csv-parse');

app.set('view engine','ejs');
app.use(express.static('assets'))

API_KEY=process.env.API_KEY
app.use(function(req, res, next){
  res.locals.API_KEY = req.API_KEY;
  next();
});

// database/hamirpur_polling_booth.tsv

// var file = fs.readFileSync("/database/hamirpur_polling_booth.tsv");
// fs.readFile("/database/hamirpur_polling_booth.tsv", {encoding: 'utf-8'}, function(err,data){
//   if (!err) {
//       console.log('received data: ' + data);
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       response.write(data);
//       response.end();
//   } else {
//       console.log(err);
//   }
// });


// var lineReader = require('readline').createInterface({
//   input: require('fs').createReadStream('/database/hamirpur_polling_booth.tsv')
// });

// lineReader.on('line', function (line) {
//   console.log('Line from file:', line);
// });


// app.get("/hidden", function(req, res){
//   fs.readFile('/database/hamirpur_polling_booth.tsv', function(err, data) {
//     res.writeHead(200);
//     res.write(data);
//     res.end();
//   });
// })

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, '/assets/database/hamirpur_polling_booth.tsv');

app.get('/hidden', function(req, res){
  // console.log("In hidden")
    var arr = []
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      // console.log(filePath)
      if (err) {

        console.log(err);
      } else {
        // console.log('received data: ' + data);
        
        res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
      }
  });

})

// csv(file, {delimiter: tab, relax: true, columns: true}, (err, out) => {
//     if (err) {
//       console.log("ERROR: " + err.message);
//     }
//     if (out) {
//       out = _.sortBy(out, function (film) {
//         return film.Year;
//       })
  
//       _.each(out, function (film) {
//         var runtime = film.Runtime.length == 0 ? null : parseInt(film.Runtime, 10);
//         if (result[film.Year]) {
//           result[film.Year].push(runtime);
//         } else {
//           result[film.Year] = [runtime]
//         }
//       });
  
//       _.each(result, (runtimes, year) => {
//         var onlyValues = _.filter(runtimes, (num) => { return !_.isNull(num); });
//         ranges.push([year, Math.min.apply(null, onlyValues), Math.max.apply(null, onlyValues),]);
//         averages.push([year, Math.round(_.reduce(onlyValues, (memo, num) => {
//           return memo + num;
//         }, 0)/onlyValues.length)])
//       });
  
//       fs.writeFile('averages.json', JSON.stringify(averages, null, 2));
//       fs.writeFile('ranges.json', JSON.stringify(ranges, null, 2));
//     }
//   });



app.get('/', function(req, res){
    res.render('home')
})

app.get('/booths/nearme', function(req, res){
    // console.log(process.env.API_KEY)
    res.render('nearme',{API_KEY : process.env.API_KEY})
})

app.listen(PORT, function(err){
    if(err)
        console.log(err)
    else
        console.log('Server has started...')
})