const router = require('express').Router()
const Employees = require('../models/employees')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Employees.find().select("-__v")

  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  Employees.create(req.body).then(response => {
    res.json({ status, response })
  }).catch(error => {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  })

  res.json({ status, response })
})

router.get('/:id', async (req, res, next) => {
  const status = 200
  const response = await Employees.findById(req.params.id).select("-__v")

  res.json({ status, response })
})

// router.put('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Books.updateOneAndUpdate({
//     _id: req.params.id
//   }, {
//       title: req.body.title
//     }, {
//       new: true
//     })

//   res.json({ status, response })
// })

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Books.findOneAndDelete({
//     _id: req.params.id
//   })

//   res.json({ status, response })
// })

module.exports = router