const express = require('express');

// Node.js body parsing middleware.
const bodyParser = require('body-parser'); 

// give a random ID to the post a user tries to create:
const {randomBytes} = require('crypto'); 

// create the "app" service
const app = express();    

// Parse incoming request bodies in a middleware before your 
// handlers, available under the req.body property.
app.use(bodyParser.json());


// Note, this is a toy app, so we won't have a database.
// all storage will be done in RAM and will be lost
// if the app is restarted. 
// Here's our little database right here, the posts object! :-) 
const  posts = {};

// route handler # 1:
app.get('/posts', (req, res) => {
    res.send(posts);   // sends back all posts that have been created.
});

// route handler # 2:   //posts request handler for creating a post
app.post('/posts', (req, res) => {
    // req is the request we received from the user.
    // we'll assume there will be a body in teh request with a 
    // title in it {title:string}
    // this will give you a nice random looking ID:
    const id = randomBytes(4).toString('hex');   // 4 bytes of random data
    const {title} = req.body;

    posts[id] = {
        id, title
    };

    // send back a response to the user that we're good to go.
    res.status(201).send(posts[id]);     //201 means we created a resource
});

app.listen(4000, ()=> {
    console.log('Listening on 4000');   // this console.log is in the callback
} )