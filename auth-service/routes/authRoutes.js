/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user
 *       example:
 *         username: john_doe
 *         email: john.doe@example.com
 *         password: mypassword123
 */

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetail } = require('../controllers/authController');
const { protect } = require('./../middleware/authMiddleware');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the newly registered user
 *                 username:
 *                   type: string
 *                   description: The username of the newly registered user
 *                 email:
 *                   type: string
 *                   description: The email address of the newly registered user
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         description: User already exists
 *       '500':
 *         description: Server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the logged-in user
 *                 username:
 *                   type: string
 *                   description: The username of the logged-in user
 *                 email:
 *                   type: string
 *                   description: The email address of the logged-in user
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Server error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user details
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Not authorized, token failed
 *       '500':
 *         description: Server error
 */
router.get('/users', protect, getUserDetail);

module.exports = router;
