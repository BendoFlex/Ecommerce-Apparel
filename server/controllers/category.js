const categoryModel= require('../models/category');

const fields= [
	'name',
	'rename'
];

const categoryController= {
    
	create: function(req, res){

		if(typeof req.body.name==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{
            const name= req.body.name;

            const category= new categoryModel({name});

            category.validate( (error) => {
                if(error){
                    res.json({'ErreurDev': error});
                    return;
                }

                category.save( (error) => {
                    if(error){
                        res.json({'ErreurDev': error});
                        return;
                    }

                    console.log('Categorie enrégistré');
                    res.json(category);
                })
            });
        }
	},
	
	update: function(req, res){

		if(typeof req.body.name==='undefined' || typeof req.body.rename==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{
			const name= req.body.name;
			const rename= req.body.rename;
		
			categoryModel.update({name}, {name:rename}, (error, categoryResult) => {
				if(error || !categoryResult ){
				res.json({Erreur: 'La category n\'existe pas'+error});
				}
			
				res.json({categoryResult});
				console.log('Categorie modifié');
			});
		}
	},
	
	delete: function(){
		if(typeof req.body.name==='undefined'){
			res.json({Erreur: 'Les champs sont manquants'});
			return;
		}else{
			const name= req.body.name;
		
			categoryModel.remove({name}, (error, categoryResult) => {
				if(error || !categoryResult ){
				res.json({Erreur: 'La category n\'existe pas'+error});
				}
			
				res.json({categoryResult});
				console.log('Categorie supprimé');
			});
		}
		
	}
}

module.exports= categoryController;