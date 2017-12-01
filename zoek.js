const request = require('request')

const zoek = ( req, res) => {
  console.log(req.body)
  const url = 'https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.stad
  console.log(url);
  request(url, (err, response, body ) => {
    console.log('parseZoek');
    if (err) {
      console.log('er ging iets mis', err)
      res.sendStatus(500)
    }
    // Hier ging het goed
    parseZoek(body, res)

  })
}

module.exports = zoek

const parseZoek = (body, response) => {
  const resultaten = JSON.parse(body)

  const verkooppunten = resultaten.map( (resultaat) => {
    return `<li>${resultaat.naam} - ${resultaat.adres}</li>`
  } )
  console.log(verkooppunten);
  response.render('index', {
    verkoop: `
    <div id='resultaten'>
      <h3>De verkooppunten</h3>
      <ul>
        ${verkooppunten}
      </ul>
    </div>
    `,
  })
}
