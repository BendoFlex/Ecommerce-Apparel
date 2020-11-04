const express= require('express');
const app= express();
//Charger le router user.js
const userRoute= require('./routers/user');
//Charger le router product.js
const productRoute= require('./routers/product');

/* Les routes commencant par la racine sont destinees aux clients */
app.use('/', userRoute());

/* Les routes commencant par api sont destinees aux produits */
app.use('/api', productRoute());

app.listen(8080);