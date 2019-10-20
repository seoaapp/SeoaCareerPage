const PORT = 3004 || process.env.careerPort

const fs = require('fs')
const ejs = require('ejs')
const cors = require('cors')
const path = require('path').resolve()
const chalk = require('chalk')
const express = require('express')

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
  ejs.renderFile(path + '/page/index.html', (err, str) => {
    if (err) console.log(chalk.bold.red(err))
    res.send(str)
  })
})

app.get('/src/:type/:path', (req, res) => {
  switch (req.params.type) {
    case 'js':
      fs.readFile(path + '/page/javascript/' + req.params.path, (err, data) => {
        if (err) res.sendStatus(500)
        else res.send(data)
      })
      break

    case 'css':
      fs.readFile(path + '/page/style/' + req.params.path, (err, data) => {
        if (err) res.sendStatus(500)
        else res.send(data)
      })
      break

    case 'img':
      if (fs.existsSync(path + '/page/image/' + req.params.path)) res.sendFile(path + '/page/image/' + req.params.path)
      else res.sendStatus(404)
      break

    default:
      res.sendStatus(404)
      break
  }
})

app.get('/favicon.png', (req, res) => {
  res.sendFile(path + '/page/image/favicon.png')
})

app.listen(PORT, () => {
  console.log(chalk.bold.blue('Seoa Career Page is now running on http://localhost:' + PORT + '/ !'))
})
