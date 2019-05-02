const map = require("./translitMap"),
      fs = require("fs"),
      translit = require("translit")(map),
      mongoose = require('mongoose'),
      text = require("./template");

const config = {
    db: "forex",
    file: "brokers.txt"
}

mongoose.connect('mongodb://localhost/' + config.db, { useCreateIndex: true, useNewUrlParser: true });

const PageContentSchema = new mongoose.Schema({
    pageLabel: String,
    title: String,
    subtitle: String,
    langCode: String,
    text: String,
    metaData: Object,
});

const PageSchema = new mongoose.Schema({
    label: {
        type: String,
        index: { unique: true }
    },
    uri: {
        type: String,
        index: { unique: true }
    },
    options: {type: Object, default: {}},
    isActive: { type: Boolean, default: false },
    categories: {type: Array, default: []}
});

const pageContents = mongoose.model('page_contents', PageContentSchema),
      pages = mongoose.model('pages', PageSchema);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {


    const fileContent = fs.readFileSync(config.file, "utf8"),
          arr = fileContent.split("\n"),
          reg = /[+*?$^(.) -]/g;

    for (let index = 0; index < arr.length; index++) {

            let name = arr[index].replace(/\r|\n/g, '');

            if(name === '') return true;

            let page = {
                label: translit(name.replace(reg, "").toLowerCase()),
                uri: translit(name.replace(reg, "").toLowerCase()),
                options: { script: '' },
                isActive: false,
                categories: ["broker"]
            };
        
            let pageCont = {
                pageLabel: translit(name.replace(reg, "").toLowerCase()),
                title: name,
                subtitle: "",
                langCode: "ru",
                text: text(name),
                metaData: {
                    description: `Читайте правдивые отзывы о брокерах. Все что должен знать каждый трейдер о ${name} перед началом торговли с любым дилинговым центром на Forex-Kitchen`,
                    title: `${name} - отзывы о брокерах 2019 | Forex-Kitchen`
                }
            };

            pages.create(page,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`${index}. Add ${name}`);
                }
            });
        
            pageContents.create(pageCont,(err)=>{
                if(err){
                    console.log(err);
                }
            });
    }
  
  
});

