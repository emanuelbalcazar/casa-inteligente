var async = require('async');
var controller = require('./machine');

var machines = ['time', 'temperature', 'movement', 'humidity', 'brightness'];

controller.deleteAll(function (error, deleted) {
    load();
});

function load() {
    async.map(machines, function (machine, callback) {
        var module = "../json/" + machine + ".json";
        var data = require(module);

        controller.save(data, function (error, result) {
            return callback(error, result);
        });
    },
    function (error, result) {
        if (error)
            return console.log('Error al ejecutar el seeder', error);

        console.log('Seeder ejecutado correctamente');
        process.exit();        
    });
}
