const express = require('express');
const http = require('http'); // To create the server
const { Server } = require('socket.io'); // Import Socket.IO
const cors = require('cors');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const listingsRoutes = require('./routes/listings');
const issuesRoutes = require('./routes/issueRoutes.js')

const app = express();
const server = http.createServer(app); // Wrap Express app in HTTP server
const io = new Server(server, {
    cors: {
        origin: '*', // Update with the frontend's origin if available                                      HERE!
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Initialize DB
connectDB().then(()=>{
    // Start Server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

//  Test API connection
app.get('/', (req, res) =>{
    res.send("Welcome to FUTO Landlord and Tenant API");
});

// Routes
app.use('/api/chats', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/issues', issuesRoutes);

// Socket.IO Real-Time Connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a chat room
    socket.on('joinRoom', ({ chatId }) => {
        socket.join(chatId); // Join a specific room based on chatId
        console.log(`User joined room: ${chatId}`);
    });

    // Send a message
    socket.on('sendMessage', ({ chatId, senderId, message }) => {
        const msg = { chatId, senderId, message, timestamp: new Date() };

        // Emit the message to all users in the chat room
        io.to(chatId).emit('receiveMessage', msg);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
