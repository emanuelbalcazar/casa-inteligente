var Handler = require('./handler');

class Time extends Handler {

    constructor() {
        super();
    };

    execute(data, callback) {
        callback(false, "executed");
    };
}

module.exports = new Time();