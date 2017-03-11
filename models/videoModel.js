var hyena = require('hyena');
var connection = require('hyena/lib/mysql');
var Schema = hyena.Schema;

hyena.connect('mysql://root:root@localhost/youtubedb');

module.exports = {
	video : function(){ return hyena.model('Video', new Schema(
			  {id: {type: 'number', required: true},
              user_id: {type: 'number', required: true},			 
			  name: { type: 'string', requried: true },
			  path: { type: 'string', required: true },
              screenshot_path: { type: 'string', required: true },
			  added_date: {type:"string", required: true}
			}))}
};