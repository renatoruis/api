const fs = require('fs').promises
const path = require('path')

module.exports = async () => {
  const _path = path.join(__dirname, '../../data/data.tab')
  const buffer = await fs.readFile(_path)
  const lines = buffer.toString().split('\n')

  return lines.map(line => {
    const fields = line.split('\t')
    if (fields.length === 4) {
      const [localidade, uf] = fields[1].indexOf('/') >= 0 ? fields[1].split('/') : [fields[1], fields[1]]
      return {
        cep: fields[0],
        localidade,
        uf,
        bairro: fields[2],
        logradouro: fields[3]
      }
    }
    if (fields.length === 5) {
      const [localidade, uf] = fields[1].indexOf('/') >= 0 ? fields[1].split('/') : [fields[1], fields[1]]

      return {
        cep: fields[0],
        localidade,
        uf,
        bairro: fields[2],
        logradouro: fields[3],
        referencia2: fields[4]
      }
    }
  }).filter(a => !!a)
}
