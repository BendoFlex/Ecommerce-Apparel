const mongoose = require('mongoose');
const Schema= require('mongoose').Schema;

const userSchema= new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	hashed_password: {
		type: String,
		required: true,
	},
	
	salt: String, // salt utilisé pour generer des mots de passe hashed
	
	role: {
		type: Number,
		default: 0
	}
});

module.exports= mongoose.model('userModel', userSchema);