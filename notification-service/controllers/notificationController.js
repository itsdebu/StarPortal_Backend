const notificationService = require('../services/notificationService');

// Create a new notification
exports.createNotification = async (req, res) => {
    const fromUserId = req.user._id;
    const { userId: toUserId, message } = req.body;

    try {
        const notification = await notificationService.createNotification(fromUserId, toUserId, message);
        res.status(201).json({ msg: "Notification sent successfully", notification });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all notifications for the authenticated user, separated by read status and grouped by user ID
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getNotifications(req.user._id);

        // Separate unread and read notifications
        const unreadNotifications = notifications.filter(notification => !notification.read);
        const readNotifications = notifications.filter(notification => notification.read);

        // Group notifications by user
        const groupNotificationsByUser = (notificationsArray) => {
            return notificationsArray.reduce((acc, notification) => {
                if (!acc[notification.fromUser]) {
                    acc[notification.fromUser] = [];
                }
                acc[notification.fromUser].push(notification);
                return acc;
            }, {});
        };

        const groupedUnreadNotifications = groupNotificationsByUser(unreadNotifications);
        const groupedReadNotifications = groupNotificationsByUser(readNotifications);

        res.json({
            unreadNotifications: groupedUnreadNotifications,
            readNotifications: groupedReadNotifications
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a specific notification
exports.getNotification = async (req, res) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
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
        const notification = await notificationService.markAsRead(req.params.id);
        res.json(notification);
    } catch (err) {
        if (err.message === 'Notification not found') {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all messages for a specific user by user ID for the logged-in user
exports.getMessagesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await notificationService.getMessagesByUser(userId);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
