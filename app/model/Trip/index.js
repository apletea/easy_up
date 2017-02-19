'use strict';

let Sequelize = require('sequelize');

let attributes = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.BIGINT
	},
	family_id : {
		allowNull: false,
		type:Sequelize.BIGINT
	},
	start_point_lon: {
		allowNull: false,
		type: Sequelize.DOUBLE
	},
	start_point_lat: {
		allowNull: false,
		type: Sequelize.DOUBLE
	}
	end_point_lon: {
		allowNull: false,
		type: Sequelize.DOUBLE
	},
	end_point_lat:{
		allowNull: false,
		type: Sequelize.DOUBLE
	},
	cost : {
		defaultValue: 0,
		type: Sequelize.REAL
	},
	killometrs: {
		defaultValue: 0,
		type: Sequelize.REAL
	},
	is_ended: {
		defaultValue: false,
		type: Sequelize.BOOLEAN
	},
	philanthrop_id: Sequelize.BIGINT,
	recall: Sequelize.String,
	carriage : Sequelize.BOOLEAN
};

let options = {
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