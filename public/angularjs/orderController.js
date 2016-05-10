var app = angular.module('OrderApp', []);
app.controller('OrderController', function($scope,$http,$location,$window) {
console.log("In Order Controller");

$scope.confirmOrder=function(){
	$scope.orderId="345";
	console.log("Order ID" +$scope.orderId);
	$http({
	method : "POST",
	url : '/getOrderDetails',
	data:{
		"customerId":$scope.orderId
	}

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
	$scope.expiry=data.result.expiry;
	}).error(function(error) {
	$window.alert("Error: " +JSON.stringify(error));
	});	

/*console.log("In confirmOrder controller");
$window.location="/orderSummary";*/
};


$scope.confirmOrder=function(){
	$scope.orderId="345";
	console.log("Order ID" +$scope.orderId);
	$http({
	method : "POST",
	url : '/getOrderDetails',
	data:{
		"customerId":$scope.orderId
	}

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
	$scope.expiry=data.result.expiry;
	}).error(function(error) {
	$window.alert("Error: " +JSON.stringify(error));
	});	

/*console.log("In confirmOrder controller");
$window.location="/orderSummary";*/
};

});
