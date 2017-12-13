const request = require('request')

const vertrekken = (req, res) => {

// /vertrekken
  if(!req.query.halte_id) return res.render('vertrekken')

  // /vertrekken?halte_id=XXXXX
  //TODO sanitize req.query.halte_id
  const url =`https://www.delijn.be/rise-api-core/haltes/vertrekken/${req.query.halte_id}/5`

request(url, (err,response,body) => {
  console.log('Vertrekken informatie:', response.statusCode);
  if(err || response.statusCode !== 200) {
    console.log('er ging iets mis', err)
    res.sendStatus(500)
    //TODO res.render ('error')
  }

  const resultaten = JSON.parse(body)
  const vertrekInfo = getVertrek (resultaten)
  res.render('vertrek',{
    vertrekInfo
  })
})

}


module.exports = vertrekken

/*if(vertrekInfo.length === 0)
  return  `
        <p>Er werd geen halte gevonden</p>
        <a href="/halten"><button>back</button></a>
  `*/

  const getVertrek = resultaten => {
    let html =`
        <div>
          <p>${resultaten.huidigeDag}</p> | <p>${resultaten.huidigeTijd}</p>
        </div> `

    for (var i = 0; i < resultaten.lijnen.length; i++) {
      resultaten.lijnen[i]
      lijnen = resultaten.lijnen[i]
    html += `<div>
      <p>${lijnen.bestemming}</p>
      <p>${lijnen.lijnNummer}</p>
      <p>${lijnen.lijnRichting}</p>
      <p>${lijnen.lijnType}</p>
      <p>${lijnen.vertrekTijd}</p>
    </div>`

    }

      return html;

  //})
}
