var express = require('express');
var router = express.Router();

// TODO: extract from the database... :D
var inputs = [
    {
        name: "Tiempo",
        type: "time",
        unit: "Hs"
    },
    {
        name: "Temperatura",
        type: "temperature",
        unit: "C°"
    },
    {
        name: "Movimiento",
        type: "movement",
        unit: ""
    },
    {
        name: "Humedad",
        type: "humidity",
        unit: "%"
    },
    {
        name: "Luminosidad",
        type: "brightness",
        unit: "%"
    }
];

router.get('/inputs', function (req, res) {
    res.send(inputs);
});

module.exports = router;