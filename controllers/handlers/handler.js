var controller = require('../machine');

class Handler {

    /**
     * Initialize the handler with all the machines. 
     * @memberof Handler
     */
    inicialize(callback) {
        controller.findAll(function (error, result) {
            return callback(error, result);
        });     
    }   

    /**
     * Execute the handle with the received input.
     * @memberof Handler
     */
    execute(data,  callback) {
        throw new Error('execute() must be implemented');
    };
}

module.exports = Handler;