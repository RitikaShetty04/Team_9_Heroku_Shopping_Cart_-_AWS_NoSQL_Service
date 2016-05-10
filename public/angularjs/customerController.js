var app = angular.module('CustomerApp', []);
app.controller('CustomerController', function($scope,$http,$location,$window) {
	console.log("In Customer Controller");

	$scope.signup=function(){
//		var firstname=req.param("firstname");
//		var lastname=req.param("lastname");
//		var email=req.param("email");
//		var username=req.param("username");
//		var password=req.param("password");
//		var address=req.param("address");
//		var card_no=req.param("card_no");
//		var cvv=req.param("cvv");
//		var expiredate=req.param("expire_date");
		console.log("firstname"+$scope.firstname);
		$http(
				{
					method : "POST",
					url : '/signup',
					data : {
						"firstname" : $scope.firstname,
						"lastname" : $scope.lastname,
						"email" : $scope.email,
						"password" : $scope.password,
						"address" : $scope.address,
						"card_no" : $scope.card_no,
						"cvv" : $scope.cvv,
						"expire_date":$scope.expire_date
					}
				}).success(function(data) {
					console.log("status"+data.status);
					if(data.status=="Success")
						{
						window.location="/login";
						}
		})
	}
	
	
$scope.homepage = function(){
//	alert("aaya");
	window.location="/";
}
$scope.go_to_signup = function(){
//	alert("signup");
	window.location="/go_to_signup";
}

$scope.login = function(){
//	alert("signup");
	window.location="/login";
}

$scope.go_to_cart = function(){
	
	window.location="/goToCart";
}

$scope.viewProfile=function(){
		console.log("In viewProfile controller");
		$window.location="/viewProfile";
	};
	$scope.LogOut=function(){
		//console.log("In viewProfile controller");
		
			window.location="/logout";
		};

	
//get the profile details when the page is loaded
$scope.getProfileDetails=function(){
	
		$http({
			method : "GET",
			url : '/getProfileDetails'
		}).success(function(data) {
			console.log("in success Customer Controller: "+JSON.stringify(data));
			$scope.userName=data.result.user_name;
			$scope.first_name=data.result.first_name;
			$scope.last_name=data.result.last_name;
			$scope.address=data.result.address;
			$scope.zipcode=data.result.zipcode;
			$scope.email=data.result.email;
			$scope.phone_no=data.result.phone_no;
			$scope.card_no=data.result.card_no;
			$scope.cvv=data.result.cvv;
			$scope.expiry=data.result.expire_date;
		}).error(function(error) {
			$window.alert("Error: " +JSON.stringify(error));
		});	
		
	};

//UpdateProfile Controller
$scope.updateProfile=function(first_name,last_name,address,zipcode,email,password,phone_no,card_no,cvv,expiry){
	
		console.log("In updateProfile controller");
		$http({
			method : "POST",
			url : '/editProfile',
			data : {
				"first_name" : first_name,
				"last_name" : last_name,
				"address" : address,
				"zipcode" : zipcode,
				"email":email,
				"password":password,
				"phone_no" : phone_no,
				"card_no": card_no,
				"cvv": cvv,
				"expiry":expiry
			}
		}).success(function(data) {
			
			console.log("in success UpdateProfile Controller: "+JSON.stringify(data));			
			
			$scope.updatesuccessmessage=true;
			
		}).error(function(error) {
			$window.alert("Error" +JSON.stringify(error));
		});	
		
	};

//viewOrderHistory Controller

	$scope.viewOrderHistory=function(){
		console.log("In viewOrderHistory controller");
		$window.location="/renderOrderPage";
	};	
	
$scope.getOrderDetails=function(req,res){
    	
		console.log("In getOrderDetails controller");
    	
		$http({
			method : "GET",
			url : '/getOrderDetails'
			
		}).success(function(data) {
			if(data.status==200)
			{
			console.log("in success getOrderDetails Controller: "+JSON.stringify(data));			
			console.log("Data.result" +data.result[0].value);
			$scope.orders=data.result;
			}
			else
				{
				console.log("out");
				$scope.message=data.message;
				}
						
		}).error(function(error) {
			$window.alert("Error" +JSON.stringify(error));
		});	
   
    	
    };
    

});

