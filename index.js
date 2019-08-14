// // implement your API here

// /*
//  help with req.body empty object issue 
// https://www.reddit.com/r/node/comments/75ad8w/very_new_to_nodeexpress_help_with_reqbody_empty/

// How to handle the POST request body in Node.js without using a framework
// https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190

// */


// const express = require('express');

// // POST need this package to install npm install cors
// const cors = require("cors");

// // const bodyParser = require('body-parser');

// // Create application/json parser
// // var jsonParser = bodyParser.json();

// const db = require('./data/db.js');


// // global objects
// const server = express();

// // middleware
// server.use(express.json());

// server.use(cors());

// // // parse application/x-www-form-urlencoded
// // server.use(bodyParser.urlencoded({ extended: false }))
// // // parse application/json
// // server.use(bodyParser.json())



// // GET /api/users

// server.get('/api/users', (req, res) =>{
//     console.log('get method request body :', req.body);
//     db.find()
//     .then(user => {
//         res.status(200).json(user);
//         console.log('user data is here: ', user)
//     })
//     .catch(err => {
//         res.status(500).json({
//             err: err,
//             message: "The user's information could not be retrieved!!!"
//         })
//     })
// })

// // GET /api/users/:id

// server.get('/api/users/:id', (req, res) => {
//     const { id } = req.params;

//     db.findById(id)
//     .then(user => {
//         if(user) {
//             res.json(user)
//         } else {
//             res.status(404).json({
//                 err: err,
//                 message: "The user with the ID does not exist!!!!"
//             })
//         }
//     })
//     .catch(err => {
//         res.status(500).json({
//             err: err,
//             message: "The user id does not exist so information could not be retrieved!!!"
//         })
//     }

//     )
// })


// // request handler - Creates a user using the information sent inside the request body.
// server.post('/api/users', (req, res) => {
//     const newPerson = req.body
//     console.log('req.body content is: ', newPerson);
//     // checks to see that "name" and "bio" are present on the object, then runs the code
//     if ( newPerson.hasOwnProperty('name') && newPerson.hasOwnProperty('bio') ) {
//         console.log('new person', newPerson)
//         db.insert(newPerson)
//         .then(person => {
//             res.status(201).json(person)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 err: err,
//                 message: 'There was an error while saving the user to the database'
//             })
//         })
//     } else {
//         res.status(400).json({
//             message: 'Please provide name and bio for the user.'
//         })
//     }
// })

// // POST  /api/users

// // server.post('/api/users', (req, res) => {
// //     const newUser = req.body;
// //     const { name, bio } = req.body;
// //     console.log("new user added to db: ", newUser);
// //     console.log("new user name is: ", name);

// //     db.insert(newUser)
// //     .then(user => {
// //         user.name.length === 0 || user.bio.length === 0
// //         ? res
// //             .status(400)
// //             .json({ errorMessage: "Please provide name and bio for the user." })
// //         : res.json(user);
// //     })
// //     .catch(err => {
// //         res.status(500).json({
// //         error: "There was an error while saving the user to the database"
// //         });
// //     });
// // });

// // server.post('/api/users', (req, res) => {
// //     // define newUser assign from body
// //     console.log('what is the request: ' , req.body);
// //     const newUser = req.body; 
// //     const { name, bio } = req.body;

// //     console.log('newUser is here: ', req.body);

// //     if ( !name || !bio ) {
// //         res.status(400).json({
// //             err: "you forget to enter name and bio for the user"
// //         })
// //     } else {
// //         db.insert(newUser)
// //         .then(user => {
// //             res.status(201).json(user)
// //         })
// //         .catch(err => {
// //             res.status(500).json({
// //                 err: err,
// //                 message: "Error for saving the user info in Database!!!!"
// //             })
// //         })
// //     }
// // })


// // server.post('/api/users', (req, res) => {
// //     const { name, bio } = req.body;

// //     if (!name || !bio) {
// //     res
// //         .status(400)
// //         .json({ errorMessage: 'Please provide name and bio for the user.' });
// //     } else {
// //     Users.insert(req.body)
// //         .then(user => {
// //         res.status(201).json(user);
// //         })
// //         .catch(() => {
// //         res.status(500).json({
// //             errorMessage:
// //             'There was an error while saving the user to the database',
// //         });
// //         });
// //     }
// // });



// // PUT /api/users/:id

// server.put('/api/users/:id', (req, res) => {

//     const { name, bio } = req.body;

//     if ( !name || !bio){
//         res
//         .status(400)
//         .json({
//             err: "you forget to enter name and bio for the user!!!!"
//         })
//     } else {
//         Users.update(req.params.id, req.body)
//         .then(user => {
//         if (user) {
//           res.status(200).json(user);
//         } else {
//           res
//             .status(404)
//             .json({
//               message: 'The user with the specified ID does not exist.',
//             });
//         }
//       })
//       .catch(() => {
//         res.status(500).json({
//           errorMessage: 'The user information could not be modified.',
//         });
//       });
//   }
// });

// // LISTENING 

// server.listen(3000, () => {
//     console.log('Server is running on port 3000...');
// })
// // const port = 5000;
// // server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));

// implement your API here

// Libraries
const express = require('express')

// Other Files
const db = require('./data/db.js')

// global objects
const server = express()

// middleware
server.use(express.json())

// request handler - Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    db.find()
    .then(persons => {
        console.log('persons', persons)
        res.json(persons)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The users information could not be retrieved."
        })
    })
})

// request handler - Creates a user using the information sent inside the request body.
// server.post('/api/users', (req, res) => {
//     const newPerson = req.body
//     const { name, bio } = req.body;
//     // checks to see that "name" and "bio" are present on the object, then runs the 
//     //   if ( !name || !bio){

//     // if ( newPerson.hasOwnProperty('name') && newPerson.hasOwnProperty('bio') ) {
//     //     console.log('new person', newPerson)
//     if ( name && bio ) {
//         console.log('req.body content is: ', newPerson)
//         db.insert(newPerson)
//         .then(person => {
//             res.status(201).json(person)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 err: err,
//                 message: 'There was an error while saving the user to the database'
//             })
//         })
//     } else {
//         res.status(400).json({
//             message: 'Please provide name and bio for the user.'
//         })
//     }
// })

server.post('/api/users', (req, res) => {
    // define newUser assign from body
    console.log('what is the request: ' , req.body);
    const newUser = req.body; 
    const { name, bio } = req.body;

    console.log('newUser is here: ', req.body);

    if ( !name && !bio ) {
        res.status(400).json({
            err: "you forget to enter name and bio for the user"
        })
    } else {
        db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "Error for saving the user info in Database!!!!"
            })
        })
    }
})


// request handler - Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(user => {
        console.log('user', user)
        if(user){
            res.json(user)
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            err: err,
            message: 'The user information could not be retrieved.'
        })
    })
})

//  request handler - delete user account
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
    .then(deletedUser => {
        if(deletedUser){
            // const {id}= req.params
            // const deletedUserProfile = db.findById(id)
            console.log(deletedUser)
            res.status(200).json(deletedUser)
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            err: err,
            message: 'The user could not be removed'
        })
    })
})

// request handler - Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    if(changes.hasOwnProperty('name') && changes.hasOwnProperty('bio')){
        db.update(id, changes)
        .then(updated => {
            if(updated){
                res.json(updated)
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err: err,
                message: 'The user information could not be modified.'
            })
        })
    } else {
        res.status(400).json({
            message: 'Please provide name and bio for the user.'
        })
    }
})

// Last Step, Listen
server.listen(4040, () => {
    console.log('Server is running on port 4040')
});