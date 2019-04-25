const Request = require("request"),
      Cheerio = require("cheerio");

const url = `https://www.google.com`;

    Request(url, (err, response, body) => {

        if (!err) {
            
            let $ = Cheerio.load(body),
                title = $('title').text() || $('meta[name="twitter:title"]').attr('content') || $('meta[property="og:title"]').attr('content') || $('h1').text().split("#")[0],
                description = $('meta[name="description"]').attr('content') || $('meta[name="twitter:description"]').attr('content') || $('meta[property="og:description"]').attr('content') || $('h2').text().split("#")[0],
                img = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');                
            
            return {title, description, img, url};
            
        } else {
            res.status(500).send({ err });
        }
    });