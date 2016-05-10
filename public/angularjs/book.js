//loading the 'login' angularJS module
var search_book = angular.module('search_book', []);
//defining the login controller
search_book.controller('search_book', function($scope, $http,$window) {
	console.log("In search_book controller");
	$scope.searchBy="";
	$scope.searchValue="";
	$scope.quantity=1;
	$scope.rows=[];
	console.log("inside");
	$scope.unexpected_error = true;
	
	$scope.submit = function() {
		console.log("inside");
		//alert($scope.searchValue);
		$http({
			method : "GET",
			url : '/search_book/'+$scope.searchBy+'/'+$scope.searchValue,
			
		}).success(function(data) {
			if(data.status_code==200){
				$scope.rows=data.rows;

				$scope.no_rows_returned=undefined;

				$scope.sea = $scope.searchValue;
				$scope.searchby = $scope.searchBy;

				console.log(data.rows[0]);
				
			}
			else{
				$scope.rows=[];
				$scope.no_rows_returned="Your search did not match any books in our records";
			}
			
		}).error(function(error) {
			$scope.rows=[];
		});
	};
	$scope.addToCart=function(row,quantity){
		
		console.log("quantity"+quantity.quantity);
		
		$http({
			method : "POST",
			url :'/addToCart',
			data : {
				"book_image" : row.doc.book_image,
				"book_name" : row.doc.book_name,
				"book_author" : row.doc.book_author,
				"book_cost" : row.doc.book_price,
				"book_isbn" : row.doc.book_isbn,
				"quantity" : quantity
				
			}
		}).success(function(data){
			if(data.status==400){
				$window.location="/login";
			}
			else{
				console.log(data.msg);
				$scope.msg=data.msg;
			}
		});
		
	};
	
	$scope.initialize=function(rows){
		if(rows==""){
			$scope.no_rows_returned="Your search did not match any books in our records";
		}else{
			$scope.rows=rows;
		$scope.no_rows_returned=undefined;
		}
		
		
	};
	
});


var select_category = angular.module('select_category', []);

select_category.controller('select_category', function($scope, $http) {
	console.log("In select_category controller");
	console.log("inside");
	$scope.unexpected_error = true;
	$scope.submit = function() {
		console.log("inside");
		$http({
			method : "POST",
			url : '/select_category',
			data : {
				"bookCategory" : $scope.bookCategory
			}
		}).success(function(data) {
			if(data.status_code==200){
				$scope.rows=data.rows;
				console.log(data.rows[0]);
			}
			
		}).error(function(error) {
			
		});
	};

});


var home_search_book = angular.module('home_search_book', []);
//defining the login controller
home_search_book.controller('home_search_book', function($scope, $http,$window,$location) {
console.log("In home_search_book controller");
$scope.searchBy="";
$scope.searchValue="";
$scope.rows=[];
//console.log("inside");

$scope.go_to_category = function(value){
	//alert("aaya");
	$scope.searchBy = "Category";
	$scope.searchValue = value;
	$scope.submit();
}
$scope.unexpected_error = true;

	$scope.searchBy="Category";
	//$scope.searchValue="";
	console.log("inside");
	$scope.unexpected_error = true;
	$scope.submit = function() {
		console.log("inside");
		
		$window.location="/home_search_book?searchBy="+$scope.searchBy+"&searchValue="+$scope.searchValue;
	
	};
	
	$scope.login = function() {
		console.log("login");
		
		$window.location="/login";
	
	};
});

