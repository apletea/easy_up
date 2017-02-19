'use strict';

let Sequelize = require('sequelize');
let hooks = require('./hooks');

let attributes = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.BIGINT
	},
	name: Sequelize.STRING,
	password: Sequelize.STRING,
	token: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		unique: true,
	},
	role: Sequelize.INTEGER,   // 1 - family, 2 - person, 3 - company
	description: Sequelize.STRING,
	money: Sequelize.DOUBLE,
	killometrs: Sequelize.DOUBLE,
	first_name: Sequelize.STRING,
	second_name: Sequelize.STRING
};

let options = {
	hooks: hooks,
	freezeTableName: true,
    timestamps: false,
    instanceMethods: {
    	getFullInfo: function() {
    		let self = this;

    		let jsonResult = JSON.parse(JSON.stringify(self.get()));
    		return new Promise((resolve,reject) => {
    			resolve(jsonResult);
    		})
    	}
    }
};

module.exports.attributes = attributes;
module.exports.options = options;