'use strict';

let Model = require('../model');
let emailNotification = require('../utils/mailer');
let errorUtil = require('../utils/errors');
let responseUtil = require('../utils/response');
let authHelper = require('../utils/auth');

module.exports = (express, passport) => {
	let router = express.Router();

	router.get('/getMe', passport.authenticate('jwt',{session: false}), (req,res) => {
		let user = req.user;
		user.getFullInfo()
			.then(info => {
				res.status(200);
				return res.json(info);
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});

	router.post('/register', (req,res) => {
		console.log(req.body);
		Model.User.findOne({
			where: {
				email: req.body.email.trim().toLowerCase()
			}
		})
			.then(user => {
				if (user) {
					res.status(400);
					return res.json('User with such email already exsist');
				}

				Model.User.create(req.user)
					.then(newUser => {
						res.status(200);
						return res.json(newUser);
					})
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});


	router.post('/updateProfile',passport.authenticate('jwt', {session: false}), (req,res) =>{
		let user = req.user;
		let profile = req.body;
		user.update(profile)
			.then(profile => {
				res.status(200);
				return res.json(profile);
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});

	router.get('/familiesList', (req,res) => {
		Model.User.findAll({where: {
			role: 1
		}})
			.then(familiesList => {
				res.status(200);
				return res.json(familiesList);
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});

	router.get('/getFamilie', (req,res) => {
		let familieId = req.query.id;
		Model.User.findOne({where: {
			id: familieId,
			role:1
		}})
			.then(familie => {
				res.status(200);
				return res.json(familie);
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});

	router.get('/donate', passport.authenticate('jwt', {session: false}), (req,res) => {
		let user = req.user;
		let donete = req.query.donate;
		user.update({money: donate})
			.then(result => {
				res.status(200);
				return res.json(result);
			})
			.catch(err => {
				res.status(500);
				return res.json(err);
			})
	});

	
	router.get('/login', (req,res) => {
		let email = req.query.email;
		let password = req.query.password;

		let errorObject = errorUtil.checkRequiredParams(req,['email','password'], errorUtil.errorCodes.ERR_USER_LOGIN_FAIL);

		if (errorObject) {
			res.status(400);
			return res.json(errorObject);
		}

		Model.User.findOne({where: {
			email: email.trim().toLowerCase()
		}})
		.then(result => {
			if (!result){
				res.status(403);
				return res.json(responseUtil.getErrorResponseJsonObject(errorUtil.errorCodes.ERR_USER_LOGIN_FAIL,'Invalid login or password'));
			}

			let user = result.get();

			authHelper.comparePassword(password, user.password, (err, isMatch) => {
				if (isMatch && !err){
					if (!result.get().token.startsWith('JWT')){
						result.token = authHelper.getJwtToken({
							id: result.id,
							email: result.email,
							password: result.password
						});
					}

					result.save()
						.then(result => {
							res.status(200);
							result.getFullInfo()
								.then(content => {
									return res.json(content);
								})
						})
				}
				else {
					res.status(403);
					return res.json(responseUtil.getErrorResponseJsonObject(errorUtil.errorCodes.ERR_USER_LOGIN_FAIL, 'Invalid login or Password'));			}
			})
		})
	});



	return router;
};