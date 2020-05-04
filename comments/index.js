const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

// create your express application.
const app = express();
// associate the bodyParser with the application.
app.use(bodyParser.json());

// store your comments in memory.
const commentsByPostId = {};

// define your two route handlers
app.get('/posts/:id/comments', (req,res) => {
    // send back the requested comment, 
    // or send back an empty array if comment does not exist
    res.send(commentsByPostId[req.params.id] || [] );
});

app.post('/posts/:id/comments', (req,res)=> {
    // we need to generate a random comment ID
    const commentId = randomBytes(4).toString('hex') ;
    const {content} = req.body;

    // this will give us either an array or undefined.
    // if it is undefined, then just assign an empty array.
    const comments = commentsByPostId[req.params.id] || [];

    // we now want to push the comment into the comments array.
    comments.push({id: commentId, content})

    // assign the array back into our database
    commentsByPostId[req.params.id] = comments;

    // now that we're done, we can send back the whole array 
    // to the requestor.
    res.status(201).send(comments);
});

// make sure express application listens on a unique port.

app.listen(4001,()=> {
    console.log('Listening on 4001');
});

