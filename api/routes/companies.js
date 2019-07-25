const router = require('express').Router()
const Companies = require('../models/companies')

router.get('/', async (req, res, next) => {
  const status = 200

  try {
  let parameter = req.query
  parameter = parseQuery(parameter);

  const response = await Companies.find(parameter).select("-__v")

  res.json({ status, response })
} catch (error) {
  let customError = new Error("Unable to get companies")
  customError.status = 404
  next(customError)
}
})

module.exports = router

//In progress
function parseQuery(parameter) {
  switch (Object.keys(parameter)[0]) {
    case 'name':
      return {name: new RegExp(parameter[Object.keys(parameter)[0]],'i')}
    case 'employees_lte':
      return {[`employees.employees_lte`]:{$exists: false}}
    case 'employees_gte':
      return {[`employees.employees_gte`]:{$exists: false}}
  }
}