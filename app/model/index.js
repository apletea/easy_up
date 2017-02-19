'use strict';

let UserMeta = require('./User'),
	TripMeta = require('./Ttip');

let connection = require('../init/sequalize');

let User = connection.define('users', UserMeta.attributes, UserMeta.options);
let Trip = connection.define('trip', TripMeta.attributes, TripMeta.options);

module.exports.User = User;
module.exports.Trip = Trip;

