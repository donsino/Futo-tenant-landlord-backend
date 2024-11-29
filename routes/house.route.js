const express = require('express');
const houseControllers = require('../controllers/house.controller.js');
const router = express.Router();

//  Create a new house
router.post('/', houseControllers.createPost);

//  View all hopuses
router.get('/', houseControllers.getPosts);

//  View house by id
router.get('/:id', houseControllers.getPost);

//  Update a house by id
router.put('/:id', houseControllers.updatePost);

//  Delete a house by id
router.delete('/:id', houseControllers.deletePost);

module.exports = router;