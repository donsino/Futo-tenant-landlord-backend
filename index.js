const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// initating the routes files
const houseRoute = require('./routes/house.route.js')
const issuesRoutes = require('./routes/issueRoutes.js')
const PORT = process.env.PORT || 5000;
const app = express();

//  Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//  Routes
app.use('/api/houses', houseRoute);
app.use('/api/issues', issuesRoutes);

//  Test API connection
app.get('/', (req, res) =>{
    res.send("Welcome to Futo-tenant-landlord-backend API");
});


//  DB Connection
mongoose.connect(process.env.MONGO_URI) 
.then(()=>{
    console.log("Connected to MongoDB Atlas!");
    
    app.listen(PORT, ()=>{
        console.log(`Server is running in port ${PORT}`)
    });
})
.catch((error)=>{
    console.log("Error connecting to MongoDB: ", error);
})
