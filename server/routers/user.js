const express= require('express');
const userController= require('../controllers/user');
const userModel= require('../models/user');

const userRoute= () => {
	const router= express.Router();
	
	//Creer un nouvel utilisateur admin ou client
	router.route('/user/create')
	.post( (req, res, next) => {
		userController.create(req, res);
	});
	
	//Connection d'un utilisateur
	router.route('/user/signin')
	.post( (req, res, next) => {
		userController.connect(req, res);
	});
	
	return router;
};

module.exports= userRoute;