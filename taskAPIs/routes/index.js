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
 *     description: login
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
 *        type: string
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
 * @swagger 
 * /{id}: 
 *   get: 
 *     description: Get all Users 
 *     parameters:
 *      - name: id
 *        description:  userId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get('/:id', verifyToken, getUser)
/**
 * @swagger
 * /:
 *   post:
 *     description: Get all users
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
 *      - name: age
 *        description: age of the user
 *        in: formData
 *        required: true
 *        type: number
 *      - name: firstName
 *        description: first Name 
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastName
 *        description: surname
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', addUser)
/**
 * @swagger
 * /{id}:
 *   patch:
 *     description: Get all users
 *     parameters:
 *      - name: id
 *        description:  userId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *      - name: age
 *        description: age of the user
 *        in: formData
 *        required: true
 *        type: number
 *      - name: firstName
 *        description: first Name 
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastName
 *        description: surname
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
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
