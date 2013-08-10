var Auth = require(__dirname + "/../services/auth_service").Auth();
exports.indexAction = function(req, res) {
	if (req.account === undefined) {
		res.writeHead(302, {
			'Location': '/login.html'
			//add other headers here...
		});
	} else {
		res.writeHead(302, {
			'Location': '/cabinet.html'
			//add other headers here...
		});
	}
	res.end();
}