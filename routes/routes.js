// router.js - application route module.
var express = require('express');
var router = express.Router();

// service information path.
router.get('/info', function (req, res) {
    var info = { version: "2.0", build: "november 2017" };
    defaultCallback(res, null, info);
});

function defaultCallback(res, error, result) {
    if (error)
        return res.status(404).send({ error: error });

    return res.status(200).send({ response: result });
}

module.exports = router;