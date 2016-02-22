var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { unix: 'null', natural: 'null' });
});

router.get('/:query', function(req, res) {
    var date = req.params.query;
    var unix = null;
    var natural = null;
    
    function natToUnix(date) {
        // Conver from natural date to unix timestamp
        return moment(date, "MMMM D, YYYY").format("X");
    }
    
    function unixToNat(unix) {
        // Convert unix timestamp to natural date
        return moment.unix(unix).format("MMMM D, YYYY");
    }
    
     // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = natToUnix(date);
            natural = unixToNat(unix);
        }
        
        if(!unix) {
          unix = 'null';
          natural = 'null';
        }
    
      res.render('index', { unix: unix, 
                            natural: natural });
});

module.exports = router;
