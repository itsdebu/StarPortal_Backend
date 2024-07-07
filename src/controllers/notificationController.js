const Notification = require('../models/notificationModel');
const { getChannel } = require('../utils/rabbitmq');

// Create a new notification
exports.createNotification = async (req, res) => {
    console.log(req.user._id);
    const userId = req.user._id;
    const { message } = req.body;

    try {
        const notification = new Notification({
            userId,
            message,
            read: false
        });

        await notification.save();

        const channel = getChannel();
        channel.sendToQueue(
            'notifications',
            Buffer.from(JSON.stringify(notification))
        );

        res.status(201).json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all notifications for the authenticated user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a specific notification
exports.getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        let notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
