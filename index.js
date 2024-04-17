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

app.get('/item/:id', function(req, res){
  const id = req.params.id

  const item = lista[id-1]

  res.send(item)
})

app.use(express.json())

app.post('/item', function(req, res){
  const item = req.body.nome

  lista.push(item)

  res.send('Item adicionado com sucesso ' + item)
})

app.put('/item/:id', function(req, res){
  const id = req.params.id

  const novoItem = req.body.nome

  lista[id-1] = novoItem
  res.send('Item atualizado com sucesso: ' + id + '. ' + novoItem)
})

app.listen(3000)