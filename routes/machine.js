var express = require('express');
var router = express.Router();
var controller = require('../controllers/machine');

// get all machines.
router.get('/api/machines', function (req, res) {
    controller.findAll(function (error, all) {
        defaultCallback(res, error, all);
    });
});

// find machine by id.
router.get('/api/machine/:id', function (req, res) {
    var id = req.params.id;

    controller.findById(id, function (error, result) {
        defaultCallback(res, error, result);
    });
});

// update machine by id.
router.post('/api/machine/:id', function (req, res) {
    var id = req.params.id;
    var machine = req.body;
    machine.currentState = machine.nodes[0].id;

    controller.update(id, machine, function (error, result) {
        defaultCallback(res, error, result);
    });
});

// delete a machine.
router.delete('/api/machine/:id', function (req, res) {
    var id = req.params.id;

    controller.delete(id, function (error, result) {
        defaultCallback(res, error, result);
    });
});

// create a new machine.
router.post('/api/machine', function (req, res) {
    var machine = req.body;

    controller.save(machine, function (error, result) {
        defaultCallback(res, error, result);
    });
});

function defaultCallback(res, error, result) {
    if (error)
        return res.status(404).send({ error: error });

    return res.status(200).send({ response: result });
}

module.exports = router;