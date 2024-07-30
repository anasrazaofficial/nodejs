const express = require('express')
const { signup, login, logout, forgotPassword, resetPassword, getLoggedInUser, changePassword, updateUser, getAllUsersByAdmin, getAllUsersByManager, getOneUserByAdmin, updateUserRoleByAdmin, deleteUserByAdmin } = require('../controllers/user')
const { isLoggedIn, isCustomRole } = require('../middlewares/user')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:token', resetPassword)
router.post('/password/update', isLoggedIn, changePassword)

router.get('/user', isLoggedIn, getLoggedInUser)
router.put('/user/update', isLoggedIn, updateUser)

router.get('/admin/users', isLoggedIn, isCustomRole('admin'), getAllUsersByAdmin)
router.get('/admin/user/:id', isLoggedIn, isCustomRole('admin'), getOneUserByAdmin)
router.put('/admin/user/:id', isLoggedIn, isCustomRole('admin'), updateUserRoleByAdmin)
router.delete('/admin/user/:id', isLoggedIn, isCustomRole('admin'), deleteUserByAdmin)

router.get('/manager/users', isLoggedIn, isCustomRole('manager'), getAllUsersByManager)

module.exports = router