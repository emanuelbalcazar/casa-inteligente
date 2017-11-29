var express = require('express');
var router = express.Router();
var async = require('async');
var controller = require('../controllers/machine');

var machines = ['time', 'temperature', 'movement', 'humidity', 'brightness'];

router.get('/api/seeds', function (req, res) {
    
    async.map(machines, function (machine, callback) {
        var module = "../json/" + machine + ".json";
        var data = require(module);

        controller.save(data, function (error, result) {
            return callback (error, result);
        });
    }, 
    function (error, result) {
        if (error)
            return res.status(500).send(error);

        return res.send({response: result});
    });
});

module.exports = router;