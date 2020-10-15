var express = require("express"),
    router = express.Router(),
    empty = require('is-empty'),
    moment = require('moment'),
    mail = require('../utils/mail'),
    { doQuery, sql } = require('../db');

router.get('/:id', function(req, res) {
  let query = `select * from insuranceUsers where id = ${req.params.id};`;
  let params = [];
  doQuery(res, query, params, function(data) {
    if(empty(data.recordset)) {
      res.status(400).send({error: "Insurance provider record does not exist."})
    } else {
      res.send({...data.recordset[0], userType: 'insurance'});
    }
  });
});

module.exports = router;