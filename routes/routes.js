// router.js - application route module.
var express = require('express');
var router = express.Router();
var draft = require('../json/draft.json');
var factory = require('../controllers/handlers/handlerFactory');

// service information path.
router.get('/info', function (req, res) {
    var info = { version: "2.0", build: "november 2017" };
    defaultCallback(res, null, info);
});

router.get('/api/json/draft', function (req, res) {
    defaultCallback(res, false, draft);
});

// execute an entry in all the machines.
router.get('/api/execute/:event/:data', function (req, res) {

    factory.getHandler(req.params.event, function (error, handler) {
        if (error)
            return defaultCallback(res, error, handler);

        handler.inicialize(function (error, all) {
            handler.execute(req.params.data, all, function (error, result) {
                defaultCallback(res, error, result);
            });
        });
    });
});

function defaultCallback(res, error, result) {
    if (error)
        return res.status(404).send({ error: error });

    return res.status(200).send({ response: result });
}

module.exports = router;