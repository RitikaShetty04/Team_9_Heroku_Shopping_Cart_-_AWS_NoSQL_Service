var http = require ('http');
var nano=require('nano')('http://Team-9-Load-Balancer-423702890.us-east-1.elb.amazonaws.com:5984/');
//var nano = require('nano')('http://team-9-load-balancer-423702890.us-east-1.elb.amazonaws.com:5984/');

exports.viewProfile = function(req,res){
	console.log("viewProfile Called");
	res.render("customerProfile",{'rows':""});
};

exports.getProfileDetails = function(req,res){
	console.log("getProfileDetails called");
	var test = nano.use('test');
	var email=req.session.email;
	
	console.log("Email:" +email);
	 test.view('login', 'by_email_address',{'key': email, 'include_docs': true}, function(err, body){
		    if(!err){
		    	console.log("Inside view");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		var password = body.rows[0].value.password;
		    		console.log("JS output: " +body.rows[0].value);
		    		
		    			res.status(200).json({
		    				message : "success",
		    				result:	body.rows[0].value
		    			});
		        }
		    	else
		    		{
		    		//send proper error message if user is not logged in
		    		console.log("Login to continue");
		    		}
		    }
		    else
		    	{
		    	console.log("Error connecting to Database"+err);
		    	res.status(404).json({
    				message : "Couldn't connect to Database"
    			});
		    	}
		});
};

exports.editProfile = function(req,res){
	console.log("editProfile called");
	var test = nano.use('test');
	
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var address = req.body.address;
	var zipcode = req.body.zipcode;
	var email = req.body.email;
	var password = req.body.password;
	var phone_no = req.body.phone_no;
	var card_no = req.body.card_no;
	var cvv = req.body.cvv;
	var expiry = req.body.expiry;
	
	console.log("Email:" +email);
	
	test.view('login', 'by_email_address',{'key': email, 'include_docs': true}, function(err, body){
	    if(!err){
	    	console.log("Inside view");
	    	var rows=body.rows;
	    	if(typeof body.rows[0] !== "undefined")
	        {
	    		var id = body.rows[0].value._id;
	    		var rev= body.rows[0].value._rev;
	    		console.log("JS output: " +id +"  " +rev);
	    		
	    		test.insert({"first_name":first_name,"last_name":last_name,"address":address,"zipcode":zipcode,
	    			"email":email,"password":password,"phone_no":phone_no,"card_no":card_no,"cvv":cvv,
	    			"expire_date":expiry,_rev:rev},id, function(err, body, header) {
	    			      if (err) {
	    			          console.log('[test.insert] ', err.message);
	    			          return;
	    			        }
	    			        console.log('you have inserted the Record.');
	    			        console.log(body);
	    			        
	    			        res.status(200).json({
		    				message : "success"
		    			});
	    			      }
	    		);
	    			
	        }
	    	else
	    		{
	    		//send proper error message if user is not logged in
	    		console.log("Login to continue");
	    		}
	    }
	    else
	    	{
	    	console.log("Error connecting to Database"+err);
	    	res.status(404).json({
				message : "Couldn't connect to Database"
			});
	    	}
	});
	
};

exports.renderOrderPage = function(req,res){
	console.log("renderOrderPage Called");
	res.render("orderHistory",{'rows':"","user":req.session});
};

exports.getOrderDetails = function(req,res){
	console.log("getOrderDetails called");
	var test = nano.use('order');
	var id=req.session.customer_id;
	console.log("ID: "+id);
	
	 test.view('order', 'by_customer_id',{'key': id, 'include_docs': false}, function(err, body){
		    if(!err){
		    	console.log("Inside view");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		console.log("JS output: " +body.rows);
		    		res.send({"status":200,"message":"","result":body.rows});
		    			
		        }
		    	else
		    		{
		    		//send proper message if no orders present
		    		res.send({"status":400,"message":"You haven't ordered anything from TheBookShelf yet"});
		    		console.log("Login to continue");
		    		}
		    }
		    else
		    	{
		    	console.log("Error connecting to Database"+err);
		    	res.status(404).json({
 				message : "Couldn't connect to Database"
 			});
		    	}
		});
};