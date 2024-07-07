const express = require('express');
const { createNotification, getNotifications, getNotification, markAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMidlleware');

const router = express.Router();

router.post('/', authMiddleware, createNotification);
router.get('/', authMiddleware, getNotifications);
router.get('/:id', authMiddleware, getNotification);
router.put('/:id', authMiddleware, markAsRead);

module.exports = router;
