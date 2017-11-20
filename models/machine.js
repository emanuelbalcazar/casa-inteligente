var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: { type: String },
    description: { type: String, default: "sin descripcion" },
    nodes: Array,
    edges: Array,
    currentState: { type: String }
});

var Machine = mongoose.model('machine', schema);

module.exports = Machine;
