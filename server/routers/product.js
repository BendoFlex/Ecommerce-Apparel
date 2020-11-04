const express= require('express');
//const Product= require('../models/product');

const productRoute= () => {
	const router= express.Router();
	
	//Parametrer l'id du produit comme il sera dans beaucoup d'url
	router.param('productId', (req, res, next, id) => {
	//Envoyer l'id du produit dans la requete
	req.id= id;
	next();
	});
	
	//Un route pour tester le route.param();
	router.route('/:productId')
	.get( (req, res, next) => {
		res.send('Chargement du produit avec l\'id: '+req.id); // res.send(req.params.productId);
		res.end();
	});
	
	return router;
};

module.exports= productRoute;