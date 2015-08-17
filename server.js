// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res){
	res.render("index");
})
// tell the express app to listen on port 8000
var server = app.listen(9000, function() {
	console.log("listening on port 9000");
})
// this gets the socket.io module *new code!*
var io = require('socket.io').listen(server); // notice we pass the server object
io.sockets.on('connection', function(socket){
	console.log("WE ARE USING SOCKETS!");
	console.log(socket.id);
	//console.log(socket.broadcast.emit("my_broadcast_event"));
	//console.log(io.emit("my_full_broadcast_event"));
	//all the socket code goes in here!
	socket.on("button_clicked", function(data) {
		console.log('Someone clicked a button! Reason: ' + data.reason);
		socket.emit('server_response', {response: "sockets are the best!"});
		socket.broadcast.emit("my_broadcast_event", {response: "broadcast event!"});
	})
	io.emit("my_full_broadcast_event", {response: "new person has logged in"});
})