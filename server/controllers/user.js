const userModel= require('../models/user');
const crypto= require('crypto');

const userController= {
	authenticate: function(newPassword, oldPassword){
		return this.encrypt_password(newPassword)===oldPassword;
	},
	
	encrypt_password: function(password){
		try{
			const sha1= crypto.createHash('sha1');
			sha1.update(password);
			return sha1.digest('hex');
		}catch(error){
			res.json({Erreur: error});
			return;
		}	
	},
	
	signin: function(req, res){

		if(typeof req.body.email==='undefined' || typeof req.body.password==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{
			const email= req.body.email;
			const password= req.body.password;
		
		userModel.findOne({email}, (error, userResult) => {
			if(error) throw error;
			
			if(!userResult) {
				res.json({Erreur: 'L\'utilisateur n\'existe pas'});
				return;
			}
			
			if(this.authenticate(password, userResult.hashed_password)){
				
				//Cacher le mot de passe avant d'envoyer au front-end
				userResult.hashed_password= '*******';
				res.json({Success: 'L\'utilisateur est connecte',
				User: userResult
				});
				return;
			}else{
				res.json({Erreur: 'Le mot de passe ou l\'email est incorrect'});
				return;
			}
		});
	}
},
	
	create: function(req, res){

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
	
	foo: function(){
		console.log('foo');
	}
}

module.exports= userController;