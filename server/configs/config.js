const config= {
	SERVER_PORT: process.env.port || 8080,
	DB: {
		HOST: 'localhost',
		PORT: 27017,
		DATABASE: 'e-commerce'
	},
	getURI: function() {return 'mongodb://'+ this.DB.HOST +':'+ this.DB.PORT +'/'+ this.DB.DATABASE}
};

module.exports= config;