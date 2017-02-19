'use strict';

let Model = require('../model');

module.exports = (express, passport) => {
	let router = express.Router();

	router.post('createTrip', passport.authenticate('jwt',{session: false}), (req,res) => {
		let familiId = req.user.get().id;
		let tripInfo = req.body;
		tripInfo.push(familiId)
		Model.Trip.create({where:{
			family_id: familiId,

		}})
	});

	return router;
};