var settingsData = require('../settingsData.json');

exports.view = function(req, res){
  res.render('settings.handlebars', settingsData);
};

