const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    chatId: { type: String, required: true }, // Unique ID for the chat room
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Landlord and Student
    messages: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Chat', ChatSchema);
