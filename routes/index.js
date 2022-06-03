var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
<<<<<<< HEAD
  res.render('index', { title: 'Express' });
  res.render('index', { title: 'Express' });
=======
>>>>>>> b127699d40c3454eb1cbc06504c33da37136f077
});

module.exports = router;
