var express = require('express');
var router = express.Router();

// TODO: extract from the database... :D
var inputs = [
    {
        name: "Tiempo",
        type: "time",
        unit: "Hs",
        min: 0,
        max: 23
    },
    {
        name: "Temperatura",
        type: "temperature",
        unit: "°C",
        min: 0,
        max: 40
    },
    {
        name: "Movimiento",
        type: "movement",
        unit: "",
        min: 0,
        max: 1
    },
    {
        name: "Humedad",
        type: "humidity",
        unit: "%",
        min: 0,
        max: 100
    },
    {
        name: "Luminosidad",
        type: "brightness",
        unit: "%",
        min: 0,
        max: 100
    }
];

router.get('/inputs', function (req, res) {
    res.send(inputs);
});

module.exports = router;