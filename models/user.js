var hyena = require('hyena');
var connection = require('hyena/lib/mysql');
var Schema = hyena.Schema;

hyena.connect('mysql://root:root@localhost/youtubedb');




module.exports = {
	User : function(){ return hyena.model('User', new Schema(
			  {id: {type: 'number', required: true},
			  login: { type: 'string', required: true },
			  full_name: { type: 'string', requried: true },
			  pass: { type: 'string', required: true },
			  registration_date: {type:"string", required: true}
			}))},
	sayAZAZA : function(){
		console.log("azazaaz");
	}
};
// module.exports = mongoose.model('User',{
// 	id: String,
// 	username: String,
// 	password: String,
// 	email: String,
// 	firstName: String,
// 	lastName: String
// });
