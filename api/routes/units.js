const router = require('express').Router()
const Units = require('../models/units')

router.get('/', async (req, res, next) => {
  const status = 200
  let parameter = req.query
  parameter = parseQuery(parameter);

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

router.patch('/:id', async (req, res, next) => {
  const status = 201
  try {
    const response = await Units.findOneAndUpdate({
      _id: req.params.id
    },
      req.body
      , {
        new: true
      })

    res.json({ status, response })
  } catch (error) {
    let customError = new Error("Unable to patch ID = " + req.params.id)
    customError.status = 404
    next(customError)
  }
})

router.patch('/:id/company', async (req, res, next) => {
  const status = 201
  try {
    let response = await Units.findOne({ _id: req.params.id })
    let responseCompany = response.company
    responseCompany.set(req.body)
    await response.save()

    res.json({ status, response })
  } catch (error) {
    let customError = new Error("Unable to patch ID = " + req.params.id)
    customError.status = 404
    next(customError)
  }
})

router.delete('/:id/company', async (req, res, next) => {
  const status = 201
  try {
    let response = await Units.findOne({ _id: req.params.id })
    let responseCompany = response.company
    responseCompany.remove()
    await response.save()

    res.json({ status, response })
  } catch (error) {
    let customError = new Error("Unable to delete ID = " + req.params.id)
    customError.status = 404
    next(customError)
  }
})

router.get('/:id/company/employees', async (req, res, next) => {
  const status = 201
  try {
    let response = await Units.findOne({ _id: req.params.id })
    let responseEmployees = response.company.employees

    res.json({ status, responseEmployees })
  } catch (error) {
    let customError = new Error("Unable to get employees from ID = " + req.params.id)
    customError.status = 404
    next(customError)
  }
})

router.get('/:id/company/employees/:eid', async (req, res, next) => {
  const status = 201
  try {
    let response = await Units.findOne({ _id: req.params.id })
    let responseEmployee = response.company.employees.id({_id: req.params.eid})

    res.json({ status, responseEmployee })
  } catch (error) {
    let customError = new Error("Unable to get employees from ID = " + req.params.id)
    customError.status = 404
    next(customError)
  }
})

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
