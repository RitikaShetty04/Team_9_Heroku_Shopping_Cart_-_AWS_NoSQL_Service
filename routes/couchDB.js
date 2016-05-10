
var http = require ('http');
var nano=require('nano')('http://Team-9-Load-Balancer-423702890.us-east-1.elb.amazonaws.com:5984/');
//var nano = require('nano')('http://team-9-load-balancer-423702890.us-east-1.elb.amazonaws.com:5984/');
//IP of EC2 instance:5984
//
nano.db.create('test', function() {
	// specify the database we are going to use
	var test = nano.use('test');
	// and insert a document in it
	test.insert({ email: "ritika@gmail.com",password:"ritika" }, '', function(err, body, header) {
		if (err) {
			console.log('[test.insert] ', err.message);
			return;
		}
		console.log('you have inserted the Record.');
		console.log(body);
	});
	//fetch a document by ID
	test.get('C_002', function(err,body)
			{
		if(err)
		{
			console.log('[test.get] ', err.message);
			return;
		}
		console.log("Record returned");
		console.log(body);
			});

	test.insert(
			{ "views": 
			{ "by_email_address": 
			{ 
				"map": function(doc) {
					if(doc.email && doc.password)
					{
						emit(doc.email, doc);
					}
				} 
			} 
			}
			},'_design/login');

});

//Order Views

test.insert(
		{ "views": 
		{ "by_customer_id": 
		{ 
			"map": function(doc) {	    	
				emit(doc.customer_id, doc);	    	  
			} 
		} 
		}
		},'_design/order');

//Cart Database

nano.db.create('cart',function(){
	var cart=nano.use('cart');

	cart.insert({customer_id:"123",product_details:"product details"},'',function(err, body, header) {
		if (err) {
			console.log('[cart.insert] ', err.message);
			return;
		}else
		{
			console.log("you have inserted the record");
			console.log(body);
		}
	});

	cart.get('C_001', function(err,body)
			{
		if(err)
		{
			console.log('[cart.get] ', err.message);
			return;
		}
		console.log("Record returned");
		console.log(body);
			});
	cart.insert(
			{ "views":
			{ "by_customer_id":
			{
				"map": function(doc){
					emit(doc.customer_id,doc); //doc.customer_id is the key and product details is the value
				}
			}
			}

			},'_design/viewcart');
});

var books= nano.use('books');

books.insert(
		{
			"views":
			{
				"by_book_isbn":
				{
					"map":function(doc){
						emit(doc.book_isbn,doc);
					}
				}
			}
		},'_design/checkStock');




