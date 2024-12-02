const express = require('express');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Chat = require('../models/Chat');

// Create or fetch a chat room
router.post('/room', auth, async (req, res) => {
    const { landlordId, studentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(landlordId) || !mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ success: false, msg: 'Invalid participant IDs' });
    }

    try {
        let chat = await Chat.findOne({ participants: { $all: [landlordId, studentId] } });

        if (!chat) {
            chat = new Chat({
                chatId: `${landlordId}_${studentId}`,
                participants: [landlordId, studentId],
                messages: [],
            });
            await chat.save();
        }

        res.status(200).json({ success: true, chat });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
});

// Fetch chat messages
router.get('/:chatId', auth, async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findOne({ chatId })
            .populate('participants', 'name email')
            .populate('messages.sender', 'name email');

        if (!chat) {
            return res.status(404).json({ success: false, msg: 'Chat not found' });
        }

        res.status(200).json({ success: true, data: chat.messages });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: 'Server error' });
    }
});

module.exports = router;
