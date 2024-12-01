const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
// Here is the mdels for the chatting between Landlord and Tenant

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
>>>>>>> b6dc0a69cfbae14191e940afea3222497bf8270c
