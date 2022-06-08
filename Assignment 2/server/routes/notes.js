var express = require('express')
var router = express.Router()
const note_Handler = require('../note_handler')
/* GET notes listing. */
// router.get('/get', function (req, res, next) {
//   const query = req.query
//   res.send({
//     status: 0,
//     msg: 'Get request succeed',
//     data: query
//   })
// })

/* GET notes detail. */
// router.get('/get/:id', function (req, res, next) {
//   res.send({
//     status: 0,
//     msg: 'Get request notes detail succeed',
//     data: req.params
//   })
// })

/* Put notes. */
// router.post('/post', (req, res) => {
//   console.log(req)
//   const body = req.body
//   res.send({
//     status: 1,
//     msg: 'Get post succeed',
//     data: body
//   })
//   res.send('Get post succeed')
// })
router.get('/get', note_Handler.getNotes)
router.get('/get/:id', note_Handler.getNoteDetail)
router.post('/post', note_Handler.addNote)
module.exports = router