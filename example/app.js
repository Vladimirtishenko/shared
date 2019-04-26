const express = require('express'),
      bodyParser = require('body-parser'),
      parser = require("../scripts/parser.js"),
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, X-Access-Type, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");
  next();
});


app.post('/data', (req, res) => {
  const url  = req.body && req.body.url,
        data = parser(url);
      
  res.json(data)
  
});


app.listen(2222, () =>
  console.log(`App listening on port 2222!`),
);
