// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


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

// LISTENING 

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
})