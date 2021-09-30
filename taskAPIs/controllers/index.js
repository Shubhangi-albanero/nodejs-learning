const express = require('express');
const router = express.Router();


const logger = require('../helpers/logger')
const mongodb=require('mongodb')
const mongoConnect = require('../helpers/database')
const io = require("../helpers/socketio.js");
const event = require("../helpers/eventEmitter.js");

const {
  getUsersDao,
  getUserDao,
  loginDao,
  addUserDao,
  editUserDao,
  deleteUserDao,
  getFollowersDao,
  followUserDao,
} = require("../dao/userDao")

let db;

(async () => {
  db = await mongoConnect();
  return db;
})();

const login = async (req, res, next) => {
  try {
    let {email, password} = req.body;
    let {statusCode, response} = await loginDao(email, password)
    res.status(statusCode).json(response)
  } catch(error) {
    console.log(error);
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
}

const getUsers = async (req, res, next) => {
  try {
    let users = await getUsersDao()
    res.json(users);
  }
  
  catch (error) {
    console.log(error);
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    let user = await getUserDao(id)
    if(user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: "User not found"
      })
    }
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};

const addUser =  async (req, res, next) => {
  try {
    
    const { email, password, firstName, lastName, age } = req.body;
    let user = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      password: password
    }
    await addUserDao(user);
    res.json({
      message: "User created successfully"
    })
    logger.info("User created successfully")
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};

const editUser =  async (req, res, next) => {
  try {
    
    const { firstName, lastName, age } = req.body;
    const { id } = req.params
    let user = {
      firstName: firstName,
      lastName: lastName,
      age: age
    }
    await editUserDao(id, user)
    const eventName = "edit-user"
    const eventData = `${id} has been edited successfully`
    event.getEvent(eventName)
    event.init().emit(eventName, eventData)
    res.json({
      message:"User updated successfully"
    })
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    await deleteUserDao(id)
    res.json({
      message: "deleted succesfully"
    });
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })

  }

};

const followUser = async (req, res, next) => {
  try {
    
    const { user_id } = req.body;
    const { id } = req.params
    
    var follower = new mongodb.ObjectId(id);
    await followUserDao(user_id, follower)
    io.getIO().emit("notification", "Followed user successfully!");

    const eventName = "follow-user"
    const eventData = `${user_id} has followed ${follower}`
    event.getEvent(eventName)
    event.init().emit(eventName, eventData)
    res.json({
      message: "Updated succesfully"
    });
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};

const getFollowers = async (req, res, next) => {
  try {
    
    const { id } = req.params
    let followers = await getFollowersDao(id)
    console.log(followers)
    res.json(followers);
  }
  catch (error) {
    logger.error(error);
    console.log(error)
    res.status(400).json({
      message: "Something went wrong"
    })
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.followUser = followUser;
exports.getFollowers = getFollowers;
exports.login = login;