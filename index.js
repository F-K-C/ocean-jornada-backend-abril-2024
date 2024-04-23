const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:hTmfp98MZ6vhhtew@cluster0.ffmddji.mongodb.net'
const dbName = 'ocean-jornada-backend'

async function main() {
console.log('Conectando ao banco de dados.....')
const client = new MongoClient(dbUrl)
await client.connect()
console.log('Banco de dados conectado com sucesso!')

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Exercício: Criar um endpoint [GET] /oi que exibe: "Olá, mundo!"
app.get('/oi', function (req, res) {
  res.send('Olá, mundo!')
})

// Lista de itens
const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

const db = client.db(dbName)
const collection = db.collection('item')

// Endpoint Real All -> [GET] /item
app.get('/item', async function(req, res) {
  const itens = await collection.find().toArray()

  res.send(itens)
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

app.delete('/item/:id', function(req, res){
  const id = req.params.id
  delete lista[id-1]
  res.send('Item removido com sucesso: ' + id)
})

app.listen(3000)
}

main()