const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.dirname(require.main.filename) + '/../db/dosstore.sqlite';
const db = new sqlite3.Database(dbPath)

/* GET home page. */
router.get('/', function (req, res, next) {
  let queryData = 'select * from organisation';
  db.all(queryData, (err, organisation) => {
    res.render('index', {
      title: 'Reset api app',
      organisation: organisation
    });
  });
});

/* add data form. */
router.post('/', function (req, res, next) {
  let queryAddData = `insert into organisation(org_name, website) values ("${req.body.org_name}", "${req.body.website}")`;
  db.all(queryAddData, (err) => {
    if (err) {
      res.json(err.message)
    } else {
      res.redirect('/');
      console.log('saved data to db')
    }
  });
});

/* GET update data page. */
router.get('/edit/:organisationId', function (req, res, next) {
  const { organisationId } = req.params;
  let queryData = `select * from organisation where org_id = ${ organisationId}`;
  db.all(queryData, (err, organisationData) => {
    res.render('editOrga', {
      organisationData: organisationData[0]
    });
    
  });
});

/* update data form. */
router.post('/edit/:organisationId', function (req, res, next) {
  const { organisationId } = req.params;
  let queryAddData = `update organisation set org_name = "${req.body.org_name}", website = "${req.body.website}" where org_id = ${organisationId}`;
  db.all(queryAddData, (err) => {
    if (err) {
      res.json(err.message)
    } else {
      res.redirect('/');
      console.log('the content have edited')
    }
  });
});


module.exports = router;
