const request = require('request')

const halten = (req, res) => {

  // /halten
  if(!req.query.haltenaam) return res.render('halten')

  // /halten?haltenaam=XXXXX
  //TODO sanitize req.query.haltenaam
  const url = `https://www.delijn.be/rise-api-search/search/haltes/${req.query.haltenaam}/1`

  request(url, (err, response, body ) => {
    console.log('Halte informatie', response.statusCode)
    if (err || response.statusCode !== 200) {
      console.log('er ging iets mis', err)
      res.sendStatus(500)
      //TODO res.render('error')
    }

    const resultaten = JSON.parse(body)
    const haltes = getHaltes(resultaten)
    res.render('halte',{
      haltes
    })
  })

  }

module.exports = halten

//////////

const getHaltes = resultaten => {
  let html = ''
  const { haltes } = resultaten
  // TODO: ?haltenaam=onbestaandegemeente

  if( haltes.length === 0)
    return  `
          <p>Er werd geen halte gevonden</p>
          <a href="/halten"><button>back</button></a>
    `

  haltes.forEach( halte => {
    const { lijnen } = halte
    lijnen.forEach(lijn => {
      console.log(halte)
      html += `
        <div class="lijnItem"> <p class="lijnnummer lijn">${lijn.lijnNummer}</p>  <p class="lijnomschrijving lijn">${lijn.lijnType} | ${lijn.omschrijving}   </p></div>
        `
    })
  })

  return html
}
