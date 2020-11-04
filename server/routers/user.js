const express= require('express');

const userRoute= () => {
	const router= express.Router();
	
	//Creer un nouvel utilisateur admin ou client
	router.route('/user/create')
	.post( (req, res) => {
		//Message de test
		res.send('Creation d\'un nouvel utilisateur');
	});
	
	//Connection d'un utilisateur
	router.route('/user/signin')
	.get( (req, res, next) => {
		//Message de test
		res.send('Connection d\'un nouvel utilisateur');
		next();
	});
	
	return router;
};

module.exports= userRoute;