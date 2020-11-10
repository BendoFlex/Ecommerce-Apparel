const mongoose= require('mongoose');
const Schema= require('mongoose').Schema;

const categorySchema= new Schema({
	name:{
		type: String,
		required: true,
		trim: true,
		maxlength: 32
	}
});

module.exports= mongoose.model('Category', categorySchema);