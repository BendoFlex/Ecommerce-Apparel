const mongoose = require('mongoose');
const Schema= require('mongoose').Schema;

const productSchema= new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32
	},
	description: {
		type: String,
		required: true,
		maxlength: 2000
	},
	price: {
		type: Number,
		required: true,
		trim: true,
		maxlength: true
	},
	
	quantity: {
		type: Number
	},
	
	sold: {
		type: Number,
		default: 0
	},
	
	photo: {
		data: Buffer,
		ContentType: String
	}
});

module.exports= mongoose.model('Product',productSchema);