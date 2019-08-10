// implement your API here

/*
 help with req.body empty object issue 
https://www.reddit.com/r/node/comments/75ad8w/very_new_to_nodeexpress_help_with_reqbody_empty/

How to handle the POST request body in Node.js without using a framework
https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190

*/


const express = require('express');

// POST need this package to install npm install cors
const cors = require("cors");

const bodyParser = require('body-parser');

// Create application/json parser
var jsonParser = bodyParser.json();

const db = require('./data/db.js');

// global objects
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())



// GET /api/users

server.get('/api/users', (req, res) =>{
    db.find()
    .then(user => {
        res.status(200).json(user);
        console.log('user data is here: ', user)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The user's information could not be retrieved!!!"
        })
    })
})

// GET /api/users/:id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({
                err: err,
                message: "The user with the ID does not exist!!!!"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The user id does not exist so information could not be retrieved!!!"
        })
    }

    )
})


// POST  /api/users

server.post('/api/users', jsonParser, (req, res) => {
    const newUser = req.body;
    const { name, bio } = req.body;
    console.log("new user added to db: ", newUser);
    console.log("new user name is: ", name);

    db.insert(newUser)
    .then(user => {
        user.name.length === 0 || user.bio.length === 0
        ? res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." })
        : res.json(user);
    })
    .catch(err => {
        res.status(500).json({
        error: "There was an error while saving the user to the database"
        });
    });
});

// server.post('/api/users', (req, res) => {
//     // define newUser assign from body
//     const newUser = req.body;
//     const { name, bio } = req.body;

//     // console.log('newUser is here: ', newUser);

//     if ( !name || !bio ) {
//         res.status(400).json({
//             err: "you forget to enter name and bio for the user"
//         })
//     } else {
//         db.insert(newUser)
//         .then(user => {
//             res.status(201).json(user)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 err: err,
//                 message: "Error for saving the user info in Database!!!!"
//             })
//         })
//     }
// })

// server.post('/api/users', (req, res) => {
//     const { name, bio } = req.body;

//     if (!name || !bio) {
//     res
//         .status(400)
//         .json({ errorMessage: 'Please provide name and bio for the user.' });
//     } else {
//     Users.insert(req.body)
//         .then(user => {
//         res.status(201).json(user);
//         })
//         .catch(() => {
//         res.status(500).json({
//             errorMessage:
//             'There was an error while saving the user to the database',
//         });
//         });
//     }
// });



// LISTENING 

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
})
// const port = 5000;
// server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));