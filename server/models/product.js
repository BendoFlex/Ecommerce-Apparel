const Schema= require('mongoose').schema;

const productSchema= new mongoose.schema({
	category: {
		type: ObjectId,
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
	}
	
	sold: {
		type: Number,
		default: 0
	},
	
	photo: {
		data: Buffer,
		ContentType: String
	},
	
	shipping: {
		type: Array,
		required : false
	}
});

module.exports= mongoose.module('Product',productSchema);