var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

var _idProcurado = new ObjectID("582f41ac8007913dfda7fb9d");

MongoClient.connect("mongodb://127.0.0.1:27017/contatooh", function(err, db) {
	if (err) throw err;
	db.collection("contatos").findOne({_id: _idProcurado}, function(err, contato) {
		if (err) throw err;
		console.log(contato);
	});
});