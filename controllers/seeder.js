var async = require('async');
var controller = require('./machine');

// file names
var machines = ['temperature', 'movement', 'humidity', 'brightness', 'air_conditioner'];

// delete all machines.
controller.deleteAll(function (error, deleted) {
    load();
});

// load the database with pre-configured machines.
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
