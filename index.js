const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Exercício: Criar um endpoint [GET] /oi que exibe: "Olá, mundo!"
app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

// Lista de itens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

// Endpoint Real All -> [GET] /item
app.get('/item', function(req, res) {
  res.send(lista)
})

app.listen(3000)