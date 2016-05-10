
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');
var redis   = require("redis");

var session = require("express-session");
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient(6379,'54.164.75.106');
client.on('connect', function() {
    console.log('connected to redis');
});

var login = require("./routes/login");
var book = require("./routes/book");
var cart=require("./routes/cart");
var customer = require("./routes/customer");
var signup=require("./routes/signup");
var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: '54.164.75.106', port: 6379, client: client}),
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}




app.get('/',function(req,res){  
    // create new session object.
    if(req.session) {
        // if email key is sent redirect.
    	
        //res.redirect('/homepage');
    	res.render('bookshelf',{"user":req.session});
    } else {
        // else go to home page.
        res.render('bookshelf', {"user":"", 'rows':"", 'msg':""});
        //res.render('search_book.ejs');
    }
});
app.get('/go_to_signup',function(req,res){
		res.render('sign_up');
    
})
app.get('/users', user.list);
app.get('/homepage',login.redirectToHomepage);
app.get('/viewProfile',customer.viewProfile);
app.get('/renderOrderPage',customer.renderOrderPage);
app.get('/getProfileDetails',customer.getProfileDetails);
app.get('/getOrderDetails',customer.getOrderDetails);
app.get('/home_search_book',book.home_search_book);
app.get('/viewCart',cart.viewCart);
app.get('/goToCart',cart.goToCart);
app.get('/login', login.login);
app.get('/logout', login.logout);

//POST Requests
app.post('/signup',signup.signup);
app.post('/checklogin', login.checkLogin);
app.post('/logout', login.logout);
app.post('/select_category',book.select_category);
app.get('/select_category',book.select_category);
app.get('/search_book/:searchBy/:searchValue',book.search_book);

app.post('/addToCart',cart.addToCart);

app.post('/addToCart',function(req,res){ 
		
    // create new session object.
    if(req.session.email) {
        // if email key is sent redirect.
    	
        //res.redirect('/homepage');
    	res.render('login');
    	res.render('bookshelf',{"user":req.session});
    } else {
        // else go to home page.
        res.render('bookshelf', {"user":"", 'rows':"", 'msg':""});
        //res.render('search_book.ejs');
    }
});
app.post('/removeFromCart',cart.removeFromCart);
app.post('/editProfile',customer.editProfile);
app.post('/changeQuantity',cart.changeQuantity);
app.post('/checkout',cart.checkout);
app.post('/confirm',cart.confirm);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});  
