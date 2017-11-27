var mongoose = require('mongoose');
var connection = require('../database/connection');
var Machine = require('../models/machine');

exports.findAll = function (callback) {
    Machine.find({}, function (error, all) {
        return callback(error, all);
    });
};

exports.findByName = function (name, callback) {
    Machine.find({ name: name }, function (error, founded) {
        return callback(error, founded);
    });
};

exports.findById = function (id, callback) {
    Machine.findById(id, function (error, founded) {
        return callback(error, founded);
    });
};

exports.save = function (params, callback) {
    var machine = new Machine(params);

    machine.save(function (error) {
        return callback(error, machine);
    });
};

exports.update = function (id, machine, callback) {
    Machine.findByIdAndUpdate(id, machine, { new: false }, function (error, model) {
        return callback(error, model);
    });
};

exports.delete = function (id, callback) {
    Machine.remove({ _id: id }, function (error) {
        return callback(error, true);
    });
};