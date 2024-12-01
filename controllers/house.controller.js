const House = require('../models/house.model.js');

//  Create a new house
const createPost = async(req, res)=>{
    try {
        const house = await House.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//  View all houses
const getPosts = async (req, res)=>{
    try {
        const houses = await House.find({});
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//  View house by id
const getPost = async(req, res)=>{
    try {
        const {id} = req.params;
        const house = await House.findById(id);
        console.log(house);
        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//  Update a house by id
const updatePost = async(req, res)=>{
    try {
        const {id} = req.params;
        const house = await Product.findByIdAndUpdate(id, req.body);
        if(!house)
            return res.status(404).json({message: "House not found"});

        const updatedHouse = await Product.findById(id);
        res.status(200).json(updatedHouse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//  Delete a house by id
const deletePost = async(req, res)=>{
    try {
        const {id} = req.params;
        const house = await Product.findByIdAndDelete(id);
        if(!house)
            return res.status(404).json({message: "House not found"});

        res.status(200).json({message: "House successfully deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {createPost, getPosts, getPost, updatePost, deletePost};