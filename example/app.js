const express = require('express');
const bodyParser = require('body-parser'),
      Request = require("request"),
      Cheerio = require("cheerio");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, X-Access-Type, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");
  next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/data', (req, res) => {
  let url  = req.body && req.body.url;
  
  Request(url, (err, response, body) => {

    if (!err) {
        
        let $ = Cheerio.load(body),
            title = $('title').text() || $('meta[name="twitter:title"]').attr('content') || $('meta[property="og:title"]').attr('content'),
            description = $('meta[name="description"]').attr('content') || $('meta[name="twitter:description"]').attr('content') || $('meta[property="og:description"]').attr('content'),
            img = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
        
        return res.json({title, description, img, url})
        
    } else {
        res.status(500).send({ err });
    }
});
  
});


app.listen(2222, () =>
  console.log(`App listening on port 2222!`),
);