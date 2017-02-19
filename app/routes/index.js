let express = require('express');

module.exports = (app, passport) => {
	let userRouter = require('./user')(express, passport);
	let tripRouter = require('./trip')(express, passport);
	
	app.use ('/api/user', userRouter);
	app.use ('/api/trip', tripRouter);
};