var http = require ('http');
//<<<<<<< Updated upstream
var nano = require('nano')('http://Team-9-Load-Balancer-423702890.us-east-1.elb.amazonaws.com:5984/');
//=======
//var nano = require('nano')('http://team-9-load-balancer-423702890.us-east-1.elb.amazonaws.com:5984/');
//>>>>>>> Stashed changes
//var nano = require('nano')('http://localhost:5984/');
var books=nano.db.use('books');
/*books.insert(
		  { "views": 
		    { "by_category": 
		      { 
		    	"map": function(doc) {
		    		if(doc.book_category)
		    	  {
		    			emit(doc.book_category, doc);
		    	  }
		    	  } 
		      } 
		    }
		  },'_design/getByCategory');

*/


/*


books.list(function(err, body) {
	  if (!err) {
	    body.rows.forEach(function(doc) {
	    	  books.get(doc.key, function(err,body)
	    	    		{
	    	    			if(err)
	    	    				{
	    	    				console.log('[test.get] ', err.message);
	    	    		        return;
	    	    				}
	    	    			console.log("Record returned");
	    	    			console.log(body);
	    	    		});
	    });
	  }
	  else{
		  console.log("Not found");
	  }
	});*/
exports.select_category = function(req,res)
{
	
	var bookCategory=req.param('bookCategory');
	
	books.view('getByCategory', 'by_category',{'key': bookCategory, 'include_docs': true}, function(err, body){
		  console.log("inside");  
		  if(!err){
		    	console.log("inside1");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		
		    			
		    			
		    		
		    		res.send({"rows":rows,"status_code":200});
		        }
		    	
		    }
		    else
		    	{
		    	console.log("Error "+err);
		    	}
		});
	
};

exports.search_book = function(req,res)
{
	
	
	var searchValue=req.params.searchValue;
	var searchBy=req.params.searchBy;
	var view_name;
	var view_design;
	console.log("inside search book"+searchValue+' '+searchBy);
	if(searchBy=="Category"){
		console.log("1");
		view_design="getByCategory";
		view_name="by_category";
	}
	else if(searchBy=="Author"){
		console.log("2");
		view_design="getByAuthor";
		view_name="by_author";
	}
	else{
		view_design="getByTitle";
		view_name="by_title";
		console.log("3");
	}
	
	books.view(view_design, view_name,{startkey: searchValue,endkey: searchValue+"\u9999",'include_docs': true}, function(err, body){
		  console.log("inside");  
		  if(!err){
		    	console.log("inside1");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		
		    			
		    			
		    		
		    		res.send({"rows":rows,"status_code":200});
		        }
		    	else{
		    		console.log("No rows returned");
		    		res.send({"status_code":400});
		    	}
		    	
		    }
		    else
		    	{
		    	console.log("Error "+err);
		    	res.send(err);
		    	
		    	}
		});
	
	
};


exports.home_search_book = function(req,res)
{
	//console.log(req.params.searchBy+" "+req.params.searchValue);
	
	var searchValue=req.param('searchValue');
	var searchBy=req.param('searchBy');
	var view_name;
	var view_design;
	console.log("inside home search book"+searchValue+' '+searchBy);
	if(searchBy=="Category"){
		console.log("1");
		view_design="getByCategory";
		view_name="by_category";
	}
	else if(searchBy=="Author"){
		console.log("2");
		view_design="getByAuthor";
		view_name="by_author";
	}
	else{
		view_design="getByTitle";
		view_name="by_title";
		console.log("3");
	}
	
	books.view(view_design, view_name,{startkey: searchValue,endkey: searchValue+"\u9999",'include_docs': true}, function(err, body){
		  console.log("inside");  
		  if(!err){
		    	console.log("inside1");
		    	var rows=body.rows;
		    	if(typeof body.rows[0] !== "undefined")
		        {
		    		
		    			
		    			console.log(rows[0]);
		    		console.log("Logged in?: "+req.session.email);
		    		res.render('search_book',{'rows':rows,'user':req.session,'searchValue':searchValue,'searchBy':searchBy});
		        }
		    	else{
		    		console.log("No rows returned");
		    		res.render('search_book',{'rows':'','user':req.session,'searchValue':searchValue,'searchBy':searchBy});
		    	}
		    	
		    }
		    else
		    	{
		    	console.log("Error "+err);
		    	
		    	}
		});
	
	
};

exports.select_book=function(req,res){
	var _id=req.param('_id');
	books.get(_id, function(err,body){
		if(err)
			{
			console.log('[test.get] ', err.message);
	        return;
			}
		console.log("Record returned");
		console.log(body);
	});
};