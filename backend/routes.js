const router = require('express').Router();
const authController = require('./controllers/auth-controller')
const activateController = require('./controllers/activate-controller')
const authMiddleware = require('./middlewares/auth-middleware')
const roomController = require('./controllers/room-controller')
router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate', authMiddleware, activateController.activate)
router.get('/api/refresh', authController.refresh)
router.post('/api/logout', authMiddleware, authController.logout)
router.post('/api/rooms', authMiddleware, roomController.create)
router.get('/api/rooms', authMiddleware, roomController.index)

module.exports = router;