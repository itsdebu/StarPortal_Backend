const Notification = require('../models/notificationModel');
const { getChannel } = require('../utils/rabbitmq');

exports.createNotification = async (fromUserId, toUserId, message) => {
    const notification = new Notification({
        fromUser: fromUserId,
        toUser: toUserId,
        message,
        read: false
    });

    await notification.save();

    const channel = getChannel();
    channel.sendToQueue(
        'notifications',
        Buffer.from(JSON.stringify(notification))
    );
    if (channel) {
        console.log("Notification sent successfully");
    }

    return notification;
};

exports.getNotifications = async (userId) => {
    return await Notification.find({ toUser: userId });
};

exports.getAllNotifications = async () => {
    return await Notification.find();
};

exports.getNotificationById = async (id) => {
    return await Notification.findById(id);
};

exports.markAsRead = async (id) => {
    const notification = await Notification.findById(id);
    if (!notification) {
        throw new Error('Notification not found');
    }

    notification.read = true;
    await notification.save();

    return notification;
};

exports.getMessagesByUser = async (userId) => {
    return await Notification.find({ fromUser: userId });
};
