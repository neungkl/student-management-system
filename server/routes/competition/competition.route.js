const express = require('express')
const queryHelper = require('../../utilities/query')
const Competition = require('./competition.model')

const router = express.Router()
const TABLE = 'Competitions'

router.get('/all', (req, res) => {
  queryHelper.queryAndResponse({
    sql: Competition.getAllCompetition(),
    req: req,
    res: res
  })
})

router.get('/filter', (req, res) => {
  const filterList = req.query
  queryHelper.queryAndResponse({
    sql: queryHelper.transformToSQL(TABLE, filterList),
    req: req,
    res: res
  })
})

module.exports = router
