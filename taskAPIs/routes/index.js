const express = require('express');
const router = express.Router();
const passport = require("passport")

const verifyToken = require("../middleware/auth")

const {
  login,
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  followUser,
  getFollowers
} = require("../controllers/index")

/**
 * @swagger
 * /login:
 *   post:
 *     description: Get all books
 *     parameters:
 *      - name: email
 *        description: email of user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: password of user
 *        in: formData
 *        required: true
 *        type: password
 *     responses:
 *       201:
 *         description: Created
 */

router.post('/login', login)

/** 
 * @swagger 
 * /: 
 *   get: 
 *     description: Get all Users 
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */

router.get('/', verifyToken, getUsers)
/**
 * @method get
 * @param id
 * @description get the user id
 */
router.get('/:id', verifyToken, getUser)
/**
 * @method post
 * @description add a new user 
 */
router.post('/', verifyToken, addUser)
/**
 * @method patch
 * @param id
 * @description update the user id
 */
router.patch('/:id', verifyToken, editUser)
/**
 * @method delete
 * @param id
 * @description delete the user
 */
router.delete('/:id', verifyToken, deleteUser)
/**
 * @method post
 * @param id
 * @description follow the user 
 */
router.post('/follow/:id', verifyToken, followUser)
/**
 * @method get
 * @param id
 * @description get the user's followers list
 */
router.get('/followers/:id', verifyToken, getFollowers)


module.exports = router;
