const DEBUG = true
const PORT = 3004 || process.env.careerPort

const fs = require('fs')
const ejs = require('ejs')
const cors = require('cors')
const path = require('path').resolve()
const chalk = require('chalk')
const express = require('express')

const layout = Object
layoutReload()

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
  if (DEBUG) layoutReload()
  ejs.renderFile(path + '/page/index.ejs', { layout }, (err, str) => {
    if (err) console.log(chalk.bold.red(err))
    res.send(str)
  })
})

app.get('/job/:path', (req, res) => {
  if (DEBUG) layoutReload()
  ejs.renderFile(path + '/page/job/' + req.params.path + '.ejs', { layout }, (err, str) => {
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

function layoutReload () {
  fs.readdir(path + '/layout/', (err, files) => {
    if (err) console.error(err)
    files.forEach((file) => {
      layout[file.replace('.html', '')] = fs.readFileSync(path + '/layout/' + file)
    })
  })
}
