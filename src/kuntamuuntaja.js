const fs = require('fs');

// Lue alkuperäinen JSON-tiedosto (esim.json)
const alkuperaisetTiedot = require('./lopputulos.json');

// Käy läpi jokainen tietue ja lisää neljä uutta kenttää
const muunnetutTiedot = alkuperaisetTiedot.map(item => {
  const lat = item.lat[0];
  const lon = item.lon[0];
  const north = item.north[0];
  const west = item.west[0];
  const south = item.south[0];
  const east = item.east[0];
  const tapahtumat = item.tapahtumat[0];
  const kuntaurl = []

  return {
    ...item,
    north: [north],
    west: [west],
    south: [south],
    east: [east],
    tapahtumat : [tapahtumat],
    kuntaurl : [kuntaurl]
  };
});

// Tallenna muunnetut tiedot .json-tiedostoon
fs.writeFileSync('muunnetutkunnat', JSON.stringify(muunnetutTiedot, null, 2), 'utf-8');

console.log('Tiedot on muunnettu ja tallennettu lopputulos.json-tiedostoon.');