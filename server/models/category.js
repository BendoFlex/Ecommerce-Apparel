const Schema= require('mongoose').schema;

const categorySchema= new Schema({
	name:{
		type: true,
		required: true,
		trim: true,
		maxlength: 32
	}
});

module.exports= mongoose.model('Category', categorySchema);