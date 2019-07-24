const router = require('express').Router()
const Employees = require('../models/employees')

router.get('/', async (req, res, next) => {
  const status = 200
  let parameter = req.query
  parameter = parseQuery(parameter);

  const response = await Employees.find(parameter).select("-__v")

  res.json({ status, response })
})


module.exports = router

//In progress
function parseQuery(parameter) {
  switch (Object.keys(parameter)[0]) {
    case 'name':
      return parameter;
    // case 'birthday':
    //   return parameter;
  }
}