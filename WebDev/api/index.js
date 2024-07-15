// A variable representing the actual api we are building
// The value of this variable will be the import of the express package
// Express is itself a function so add () after it to initialize it
const app = require('express')();
const PORT = 8080;

// To fire up an api on the server, call the app.listen(), this tells it to listen on a specific port which we deined as 8080
// As an optional second argument to listen(), we can fire a callback to let us know when the api is ready
// We'll have the callback just console.log the main url
/*
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)
*/

// To finally run the api, we can run : node . (to run this file)
// If we paste the url in the browser, we get 'Cannot GET/' since we do not have any endpoints setup yet
// Express will throw an error in the browser : 404 meaning the page was not found
// Debugging in the api in the browser is not the best option
// So we can access our api with tools like cURL, use a vscode extension or use a REST Client like Postman or Insomnia

// Now we need to add an endpoint to the api
// We can do that by changing a http verb to the app instance
// We can apply a bunch of different methods on the app object that represent different http verbs
// If we want to add GET endpoint to 'tshirt' URI, we can do that passing '/tshirt' as its first argument
// This will aumatically set our server with the endpoint or route : http://localhost:8080/tshirt
// It is our job to handle a request to it by passing a callback function as the second argument
// So now whenever a client or user requests that URI, it will fire this callback function to handle the request
// The function itself will provide access to 2 objects : the 'request' object and the 'response' object
// The first argument '/tshirt' is the ROUTE
// the second argument (the callback function) is the HANDLER
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: '👕',
        size: 'large'
    })
});
// req : incoming data
// res : th data we want to send back to the client
// res helps us in sending a response back to the client that can have a STATUS CODE(like 200 for OK)
// We can then send a data payload along with it (using the send() function)
// If we pass a JS object as an argument to the send() function, then it will send that data back as JSON by default
// Save the file and restart the server!

/*
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)
*/

// Now lets add a second endpoint, this time a POST endpoint followed by a slash and a dynamic URL parameter
// The ':id' here is a ROUTE PRAMATER that `captures dymanic values from the URL`
// Here we are using it to reperesent the ID of a t-shirt
// This way we can handle millions of t-shirts by using just a single function
// A POST request means that the user is trying to create new data(new t-shirts) on the server
// We need the id from the URL which is provided to us on the req paramter object
// We also need the logo on the t-shirt which will be contained in the request body
// Request Body : Custom data payload coming from the incoming request
app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: 'We need a logo!' })
    }

    res.send({
        tshirt: `👕 with your ${logo} and ID of ${id}`
    });
});

// Save the file and restart the server!

/*
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)
*/

// If we run this, then we get a 500 error response meaning our api code is broken
// It tells us we have a runtime error because it cant destructure the property of logo from the request body
// The reason for that is : express does not parse json in the body by default
// Becuase not everyone uses express to build a json api so it is not the default behaviour


// What we need to do here is set up a middleware
// This will tell express to parse json before the actual data hits the function that we are using to handle the request
// REQ -----> MIDDLEWARE(parse JSON here) -----> RESPONSE
// Think of middleware as shared code that runs before every endpoint callback that we have defined
// A very common middleware is built into express itself


// We will need to refactor our code to make a variable for express and then call app.use() to apply middleware
// The middleware we want to apply in our case is the `express.json() middleware`
// So at the beginning of the code we write:

// const express = require('express');
// const app = express();
// app.use(express.json());

// So now every request that comes in will pass through the express.json() middleware which will convert the body to json
// This json will be available in our post callback

// For the middleware implementation, I will be creating a new file `middleware.js`