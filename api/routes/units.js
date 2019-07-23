const router = require('express').Router()
const Units = require('../models/units')

router.get('/', async (req, res, next) => {
  const status = 200
  let parameter = req.query
  const value = ""

  console.log(parameter)
  console.log(Object.keys(parameter)[0])
  console.log(Object.values(parameter)[0])


  parameter = parseQuery(parameter);

  console.log(parameter)

  const response = await Units.find(parameter).select("-__v")

  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  Units.create(req.body).then(response => {
    res.json({ status, response })
  }).catch(error => {
    console.error(error)
    const e = new Error('Something went bad')
    e.status = 400
    next(e)
  })

  res.json({ status, response })
})

// router.get('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Units.findById(req.params.id).select("-__v")

//   res.json({ status, response })
// })

router.patch('/:id', async (req, res, next) => {
  const status = 200
  const response = await Units.updateOneAndUpdate({
    _id: req.params.id
  }, {
      kind: req.body.kind
    }, {
      new: true
    })

  res.json({ status, response })
})

// router.delete('/:id', async (req, res, next) => {
//   const status = 200
//   const response = await Books.findOneAndDelete({
//     _id: req.params.id
//   })

//   res.json({ status, response })
// })

module.exports = router

function parseQuery(parameter) {
  switch (Object.keys(parameter)[0]) {
    case 'kind':
      return parameter;
    case 'floor':
      return parameter;
    case 'occupied':
      if (parameter[Object.keys(parameter)[0]] == 'false') {
        return { ['company']: { $exists: false } }
      } else {
        return { ['company']: { $exists: true } }
      }
  }
}
