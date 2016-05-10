Week 1:
We discussed above the entire design of our project and the idea of the app which we want to implement. Also I have researched about heroku and how to build a connection between heroku and aws. The entire research is in my file Research_about_Heroku.

FrontEnd:
On heroku we will have our nodejs application deployed

Backend:
On aws account we will have S3 BUCKETS and our database

1. We will create a nodejs application, and push it on git. This application we will put on heroku, which will then act as our web server.
2. On the backend we will have AWS where our database will be present. Now in this we will create multiple instances and have our database on each instance. All these instances will be behind a load balancer. 
3. The web server will then everytime make call to this load balancer from which the healthy and available node will respond with updated data. The call which we make from web server to load balancer will be REST call.


Week 2 :
1. Written code for user sign_up and storing all the details in CouchDB
2. Updated Api Document for Api's(addToCart, viewCart, removeFromCart)
3. Worked on Presentation of CouchDB and installed and ran various queries to test the database

Week 3 :
1. Created a basic user interface page for View Cart of books and created an API for viewCART. While creating an API I created a view for giving out all the details of customer's cart using customer id. Tested these API's first on postman and later on UI. 
2. Deployed our nodejs code on heroku and all the steps are in Heroku installation steps in my folder.
3. Connected our application to the database on aws. Finsihed end-to-end working of login module.

Week 4 :
1. Created a nodejs API for addToCart and tested it using PostMan. Also made some paramter changes in API of Signup, as we needed more infomation about customer.
2. I worked on AngularJS module of ViewCart Page where I displayed all the books in user's cart in tabular format.
3. User can change the quantity for each book in table, for which I have created a changeQuantity API both in nodejs and angularjs. These change is reflected in cart database.
4. Created Nodejs and Angularjs API's for removeFromCart() 
5. Replicated our database and tested it for partition tolerance by changing inbound traffic of one instance. 
6. Tested end-to end working of our entire application (i.e. all api's) on heroku and aws.
7. I created a load balancer and kept all the three instances I had created behind the load balancer. Then I kept the link of load balancer in our application and tested it on heroku. Our application works proper end- to - end. 

 


