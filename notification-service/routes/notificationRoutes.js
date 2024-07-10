/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for managing notifications
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - fromUser
 *         - toUser
 *         - message
 *       properties:
 *         fromUser:
 *           type: string
 *           description: The ID of the user sending the notification
 *         toUser:
 *           type: string
 *           description: The ID of the user receiving the notification
 *         message:
 *           type: string
 *           description: The content of the notification message
 *         read:
 *           type: boolean
 *           description: Indicates whether the notification has been read
 *       example:
 *         fromUser: 60e1d74e5635a7b5e26d9f61
 *         toUser: 60e1d74e5635a7b5e26d9f62
 *         message: New message received
 *         read: false
 */

const express = require('express');
const router = express.Router();
const { createNotification, getNotifications, getNotification, markAsRead, getMessagesByUser } = require('../controllers/notificationController');
const { protect } = require('./../middleware/authMiddleware');

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '201':
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                 notification:
 *                   $ref: '#/components/schemas/Notification'
 *       '500':
 *         description: Server error
 */
router.post('/notifications', protect, createNotification);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications separated by read status
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved notifications successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unreadNotifications:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Notification'
 *                   description: Notifications grouped by unread status
 *                 readNotifications:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Notification'
 *                   description: Notifications grouped by read status
 *       '500':
 *         description: Server error
 */
router.get('/notifications', protect, getNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a specific notification by ID
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to retrieve
 *     responses:
 *       '200':
 *         description: Retrieved notification successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Server error
 */
router.get('/notifications/:id', protect, getNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to mark as read
 *     responses:
 *       '200':
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Server error
 */
router.put('/notifications/:id', protect, markAsRead);

/**
 * @swagger
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Get all messages for a specific user by user ID
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve messages for
 *     responses:
 *       '200':
 *         description: Retrieved messages successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '500':
 *         description: Server error
 */
router.get('/notifications/user/:userId', protect, getMessagesByUser);

module.exports = router;
