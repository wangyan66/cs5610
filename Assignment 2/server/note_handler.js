const db = require('./db.js')

//Add new note
exports.addNote = async function addNote (req, res) {
  const noteInfo = req.body
  //valid check
  if (!noteInfo.title) {
    return res.send({
      status: 400,
      message: 'invalid note title'
    })
  }

  //insert into database
  await db.saveToDB({
    title: noteInfo.title,
    description: noteInfo.description
  })

  res.send({
    status: 200,
    msg: 'add note successfully'
  })
}

//Get all notes
exports.getNotes = async function getNotes (req, res) {
  //read all notes in database
  const result = await db.readAll()

  res.send({
    status: 200,
    msg: 'get all notes successfully',
    data: result
  })
}

//Get note detail
exports.getNoteDetail = async function getNoteDetail (req, res) {
  const query = req.query
  //read one note detail in database
  var ObjectId = require('mongodb').ObjectId
  const result = await db.readOneDocument({ _id: ObjectId(req.params.id) })

  res.send({
    status: 200,
    msg: 'get note detail successfully',
    data: result
  })
}