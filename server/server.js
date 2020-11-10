const express= require('express');
const config= require('./configs/config');
//Charger le router user.js
const userRoute= require('./routers/user');
//Charger le router product.js
const productRoute= require('./routers/product_category');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Les routes commencant par /user sont destinees aux clients */
app.use('/user', userRoute());

/* Les routes commencant par /api/v1/products sont destinees aux produits */
app.use(`${config.API_V}/products`, productRoute());

//Base de données
mongoose.connect(config.getURI(), (error) => {
	
	if(error) throw error;
	
	console.log(`Connection a la bdd ${config.DB.DATABASE}`);
});


app.listen(config.SERVER_PORT);