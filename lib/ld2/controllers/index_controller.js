
exports.indexAction = function(req, res){
		res.writeHead(302, {
        'Location': '/login.html'
        //add other headers here...
    });
    res.end();
}