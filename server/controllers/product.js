const productModel= require('../models/product');
const categoryModel= require('../models/category');

const fields= [
    'category',
    'name',
    'description',
    'price',
    'photo',
];

const productController= {
    
	create: function(req, res){

		if(typeof req.body.category==='undefined' || typeof req.body.name==='undefined' || req.body.description==='undefined' || req.body.price==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{

			const category= req.body.category;

			categoryModel.findOne({name: category.toLowerCase().trim()}, (error, categoryResult) => {

				if(error|| !categoryResult){
					res.json({Erruer: `La category ${category} n\'existe pas`});
					return;
				}

				const category_ID= categoryResult._id;
			
            	const name= req.body.name;
            	const description= req.body.description;
            	const price= req.body.price;

            	const product= new productModel({
               		category: category_ID,
                	name,
                	description,
                	price
            	});

				product.validate( (error) => {
					if(error){
						res.json({'ErreurDev': error});
						return;
					}

					product.save( (error) => {
						if(error){
							res.json({'ErreurDev': error});
							return;
						}

						console.log('Produit enrégistré');
						res.json(product);
					})
				});
			});
		}
	},
	
	update: function(req, res){

		if(typeof req.body.email==='undefined' || typeof req.body.password==='undefined' || req.body.repassword==='undefined' || req.body.name==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{
			const email= req.body.email;
			const password= req.body.password;
			const repassword= req.body.repassword;
		
		//Verifier si l'adress email existe deja
		userModel.findOne({email}, (error, userResult) => {
			if(error) throw error;
			
			if(userResult) {
				res.json({Erreur: 'L\'email existe deja'});
				return;
			}
			
			if(password!=repassword) {
				res.json({Erreur: 'Mots de passe incorrespondants'});
				return;
			}

			const hashed_password= this.encrypt_password(password);
			
			const user= new userModel();
			user.name= req.body.name;
			user.email= email;
			user.hashed_password= hashed_password;
			
			user.validate( (error) => {
				//La methode validate valiser le modele selon son schema
				if(error) {res.json(error); return}
				
				user.save( (error) => {
					if(error) {res.json(error); return}
					
					console.log('Utilisateur enrégistré');
					
					//Ne pas renvoyer le mot de passe
					user.hashed_password= undefined;
					res.json(user);
				});
			});
		});
	}
},
	
	delete: function(){
		console.log('delete');
	}
}

module.exports= productController;