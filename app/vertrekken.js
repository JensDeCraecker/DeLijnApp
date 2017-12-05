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

console.log(body);
  const resultaten = JSON.parse(body)
  const vertrek = getVertrek (resultaten)
  res.render('vertrek',{
    vertrek
  })
})

}

module.exports = vertrekken


const getVertrek = resultaten => {
  let html = ''
  const { vertrek } = resultaten
  //TODO: ?halte_id=onbekend
}
