const express= require('express');
const productModel= require('../models/product');
const categoryModel= require('../models/category');
//const productController = require('../controllers/product');
//const categoryController = require('../controllers/category');

const productRoute= () => {
	const router= express.Router();
	
	//Parametrer l'id du produit comme il sera dans beaucoup d'url
	router.param('productId', (req, res, next, id) => {
		productModel.findOne({_id: id})
		.populate('category')
		.exec( (error, product) => {
			if(error || !product){
				res.status(400);
				res.json({'Erreur': 'Produit non trouvé'});
				return;
			}

			//Envoyer l'id du produit dans la requete
			req.id= id;
			req.category= product.category;
			next();
		});
	});
	
	router.route('/:productId')
	.get( (req, res) => {
		productModel.findOne({_id: req.id}, (error, product) => {
			if(error || !product){
				res.status(400);
				res.json({'Erreur': 'Produit non trouvé'});
				return;
			}

			res.json(product);
		});
	});

	router.route('/:productId/related')
	.get( (req, res) => {
		productModel.find({category: req.category}, (error, relatedProducts) => {
			if(error || !relatedProducts){
				res.status(400);
				res.json({'Erreur': `Produits de la categorie ${req.category} non trouvés`});
				return;
			}

			res.json(relatedProducts);
		});
	});

	router.route('/protected/:controller/:action/:userId')
	.post( (req, res, next) => {
		const action = req.params.action;
		const controller = require(`../controllers/${req.params.controller}`);
		
		if(action=='create'){
			controller.create(req,res);
		}else if(action=='update'){
			controller.update(req,res);
		}else if(action=='delete'){
			controller.delete(req,res);
		}else{
			res.status(404).send('L\'action n\'existe pas');
		}
		//next();

	}, (req, res) => {
		res.send(req.params.controller.toUpperCase()+' créé');
	});

	router.route('/dev/categories')
	.get( (req, res) => {
		categoryModel.find( (error, categories) => {
			if(error || !categories){
				res.status(400);
				res.json({'Erreur': 'Categories non trouvées'});
				return;
			}

			res.json(categories);
		});
	});

	router.route('/dev/products')
	.get( (req, res) => {
		productModel.find( (error, products) => {
			if(error || !products){
				res.status(400);
				res.json({'Erreur': 'Produits non trouvées'});
				return;
			}

			res.json(products);
		});
	});
	
	return router;
};

module.exports= productRoute;