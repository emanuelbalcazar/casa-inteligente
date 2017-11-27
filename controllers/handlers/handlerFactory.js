class HandlerFactory {

    /**
     * Creates an instance of HandlerFactory.
     * @memberof HandlerFactory
     */
    constructor() {};

    /**
     * Instance the requested handler.
     * @param {String} type event type
     */
    getHandler(type, callback) {
        try {
            var module = "./" + type.toLowerCase();
            var handler = require(module);

            return callback(false, handler);
        } catch(exception) {
            return callback("No existe un manejador para el evento " + type + ", excepcion " + exception);
        }
    };
}

module.exports = new HandlerFactory();