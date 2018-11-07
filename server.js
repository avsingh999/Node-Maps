var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var admin = require("firebase-admin");

var serviceAccount = require("./newbie1-4813c-firebase-adminsdk-x2z0b-6571a33688.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://newbie1-4813c.firebaseio.com"
});

var app = express()

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.set('views', __dirname+'/views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(logger('dev'))

app.get('/', function(reuqest, response){
	response.render('home.ejs')
})

app.post('/', function(reuqest, response){
	console.log(reuqest.body.enter)
	var lng = reuqest.body.lng
	var lat = reuqest.body.lat
	var d = []
	admin.database().ref('locations').push({
		long:reuqest.body.lng,
		lat:reuqest.body.lat
	})
	// admin.database().ref('locations').once('value', function(snapshot){
	// 	d=snapshot.val()
	// 	console.log(snapshot.val())
	// })
	// console.log("*********************")
	// console.log(d)
	// for(i in )
	response.render('result.ejs', {lat:lat,lng:lng})
})
app.listen(3003, function(){
	console.log("running app")
})