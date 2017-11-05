//dfdf
//sakak

var express = require('express');
var app = express();

var http = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var heros = require('./heros.js');

app.route("/heroes")
	.get(function(req,res)
{
	res.send(heros);
})
	.post(function (req, res) {

		var hero = req.body;
		heros.push(hero);
		res.send(heros);
	})

 .delete(function (req,res)
	{
		for (var i = 0; i < heros.length; i++) {
			if (heros[i].name.contains(req.query['name']) ) {
				heros.splice(i,1);

			}
		}
	res.send(heros);
});


app.route("/heroes/:id")
	.get(function (req,res) {
		res.send(heros[req.params.id-1]);
	})
	.put(function (req,res){
		for (var i = 0; i < heros.length; i++) {
			if (heros[i].id === req.params.id-1) {
				heros[i].name = req.query['name'];
				break;
			}
		}
		res.send(heros[i]);

	})
	.delete(function (req, res) {
		for (var i = 0; i < heros.length; i++) {
			if (heros[i].id == req.params.id) {
				heros.splice(i,1);

			}
		}
		res.send(heros)
});
http.listen(3000, function(){
	console.log('listening on *:3000');
});


