const express = require('express')
const request = require('request')
const app = express()

const bodyParser = require('body-parser')

const halten = require('./app/halten')
const vertrekken = require('./app/vertrekken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static('./node_modules/font-awesome'))

// set the view engine to ejs
app.set('view engine', 'ejs')


app.get('/', function(req, res) {
  console.log(req.query)
  if(req.query.halte_id && req.query.num_results){
    // /?halte_id=200144&num_results=5
    halten(req, res)
  }
  else{
    //Geen QueryParams => Lege startpagina
    res.render('index', {
    })
  }
})

// Routing
app.get('/halten', (req, res) => {
    halten(req, res)
})

app.get('/kaarten', (req, res) => {
    res.render('kaarten', {
    });
});

app.get('/vertrekken', (req, res) => {
      vertrekken(req,res)
});


// Listen port 4000
console.log("port:4000");
app.listen(4000)
