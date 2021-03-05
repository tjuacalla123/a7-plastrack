var data = require('../data.json');

exports.addFriend = function(req, res){

	var newFriend = {
		"name" : req.query.name,
		"occupation" : req.query.occupation,
		"title1" : "Your name",
		"title2" : "Your occupation"
	};
	data.friends.push(newFriend);
 	res.render('settings.handlebars', data);
};

