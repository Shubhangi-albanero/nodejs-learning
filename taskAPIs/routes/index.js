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
 * components:
 *      schemas:
 *          user:
 *               type: object
 *               required:
 *                  - firstName
 *                  - lastName
 *                  - age
 *                  - email
 *                  - password
 *
 *               properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  age:
 *                      type: number
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: string
 *                      description: password of user
  *          editUser:
 *               type: object
 *               required:
 *                  - firstName
 *                  - lastName
 *                  - age
 *
 *               properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  age:
 *                      type: number
 */


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
 *     post:
 *        description: register
 *        consumes:
 *          - application/json
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *     responses:
 *       200:
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
 *     consumes:
 *        - application/json
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/editUser'
 *     responses:
 *       200:
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
