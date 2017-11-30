var async = require('async');
var Handler = require('./handler');
var controller = require('../machine');

const BRIGHTNESS = "brightness";

class Brightness extends Handler {

    /**
     * Creates an instance of Brightness.
     * @memberof Brightness
     */
    constructor() {
        super();
    };

    /**
    * Execute the handle with the received input.
    * @memberof Brightness
    */
    execute(value, machines, callback) {
        // for each machine I bring the current state.
        async.map(machines, function (machine, callback) {
            // I look for outgoing transitions from the current state.
            var transitions = machine.edges.filter((edge) => { return edge.from == machine.currentState });

            for (var i = 0; i < transitions.length; i++) {
                // if the entry meets the condition, I transition and return the updated automata.
                if ((value >= transitions[i].min) && (value <= transitions[i].max) && (transitions[i].type == BRIGHTNESS)) {
                    machine.currentState = transitions[i].to;
                    controller.update(machine._id, machine, callback);
                    return;
                }
            }

            return callback(false, machine);
        },
        function (error, result) {
            return callback(error, result);
        });
    };
}

module.exports = new Brightness();