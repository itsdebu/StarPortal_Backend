const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
