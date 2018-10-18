var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());

var connection =mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'projectdemofb'
});
connection.connect(function(error){
  if(error){
    console.log(error);
  } else {
    console.log('DB connected successfully');
  }
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//fetching all library
app.get('/library', function(req, rep) {
    connection.query("SELECT * FROM libraries", function (error, rows, fields) {
      if (error) {
        console.log('error')
      } else {
        // rep.send(JSON.stringify(rows))
        rep.send(rows)

      }
    })
});

//fetching specific library
app.get('/library/:id', function(req, rep) {
    connection.query("SELECT * FROM libraries WHERE id = ?",[req.params.id], function (error, rows, fields) {
      if (error) {
        console.log('error')
      } else {
        rep.send(rows)
      }
    })
});

app.post('/library', function (req, rep) {
  connection.query(`INSERT INTO libraries(address,name,phone) VALUES('${req.body.address}', '${req.body.name}',${req.body.phone})`)
  connection.query("SELECT * FROM libraries", function (error, rows, fields) {
    if (error) {
      console.log('error')
    } else {
      // connection.query("SELECT * FROM libraries WHERE id =?",[rows.length], function (error, row, fields) {
        // if (error) {
          // console.log('error')
        // } else {
          rep.send(JSON.stringify(rows))
        // }
      // })
    }
  })
})

app.listen(3000, function(){
  console.log('server is running in 3000')
});
