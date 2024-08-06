// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()
server.use(express.json())

// Creates a user using the information sent inside the request body.
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const new_user = await Users.insert({ name, bio })
            res.status(201).json(new_user)
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

// Returns an array users.
server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

// Returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await Users.findById(id)
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

// Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const del_user = await Users.remove(id)
        if (!del_user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(del_user)
        }
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

// Updates the user with the specified id using data from the request body. Returns the modified user
server.put('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, bio } = req.body
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            const updated_user = await Users.update(id, { name, bio })
            if (!updated_user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(updated_user)
            }
        }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = server
