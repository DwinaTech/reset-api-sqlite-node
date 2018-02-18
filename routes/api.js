const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.dirname(require.main.filename) + '/../db/dosstore.sqlite';
const db = new sqlite3.Database(dbPath)

/* GET API */
router.get('/', function (req, res, next) {
    let queryData = 'select * from organisation';
    db.all(queryData, (err, organisation) => {
        res.status(200).json({
            organisation
        });
    });
});

module.exports = router;