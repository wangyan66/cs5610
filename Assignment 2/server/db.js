
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
module.exports = {
  connectToDB: async function connectToDB () {
    try {
      console.log("connecting to database")
      await client.connect()
      console.log("connected to database")
      // this.saveToDB({ task: '043', date: 'Monday, June 6th' })
    } catch (err) {
      console.log(err)
    }
  },
  saveToDB: async function saveToDB (note) {
    try {
      await this.connectToDB()
      const result = await client
        .db("cs5610")
        .collection("notes")
        .insertOne(note)
      console.log('New note is created with the following id: ' + result.insertedId)

    } catch (err) {
      console.log(err)
    }
  },
  readAll: async function readAll () {
    try {
      await this.connectToDB()
      console.log('readAll ')
      const cursor = await client.db("cs5610").collection("notes").find()
      const data = await cursor.toArray()
      return data
    } catch (err) {
      console.log(err)
    }
  },
  readOneDocument: async function readOneDocument (query) {
    try {
      await this.connectToDB()
      console.log('readOneDoc ', query)
      const data = await client.db("cs5610").collection("notes").findOne(query)
      return data
    } catch (err) {
      console.log(err)
    }
  },
}

