require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

const dbUrl = process.env.DATABASE_URL
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

app.get('/item/:id', async function(req, res){
  const id = req.params.id

  const item = await collection.findOne({ _id: new ObjectId(id) })

  if(!item){
    return res.status(404).send("Item não encontrado")
  }

  res.send(item)
})

app.use(express.json())

app.post('/item', async function(req, res){
  const item = req.body

  if(!item.nome) {
    return res.status(400).send("Corpo da requisição sem o campo 'nome'.")
  }

  await collection.insertOne(item)

  res.status(201).send(item)
})

app.put('/item/:id', async function(req, res){
  const id = req.params.id

  const novoItem = req.body
  if(!novoItem.nome){
    return res.status(400).send("Corpo da requisição sem o campo 'nome' ")
  }

  const teste = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: novoItem }
  )

 if(updateResult.matchedCount == 0){
  return res.status(400).send("Item não encontrado. ")
 }

  res.send('Item atualizado com sucesso: ' + id)
})

app.delete('/item/:id', async function(req, res){
  const id = req.params.id

  await collection.deleteOne({ _id: new ObjectId(id) })

  res.send('Item removido com sucesso: ' + id)
})

app.listen(3000)
}

main()