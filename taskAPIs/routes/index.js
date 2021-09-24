const express = require('express');
const router = express.Router();


const logger = require('../helpers/logger')
const mongoutil=require("../helpers/database")
const db=mongoutil.getDb();

const mongodb = require("mongodb");

router.get('/', async (req, res, next) => {
  try {
    let users = await db.collection('users').find().toArray()
    res.json(users);
  }
  
  catch (error) {
    console.log(error);
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    let users = await db.collection('users')
      .find({
        _id: new mongodb.ObjectId(id)
      })
      .toArray()

    res.json(users)
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, age } = req.body;
    let user = {
      firstName: firstName,
      lastName: lastName,
      age: age
    }
    await db.collection('users').insertOne(user)
    res.json(user)
    logger.info("User created successfully")
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, age } = req.body;
    const { id } = req.params
    let user = {
      firstName: firstName,
      lastName: lastName,
      age: age
    }
    let users = await db.collection('users').findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: user },
      function () {

        res.json({
          message: "Updated succesfully"
        });
      }
    )
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    let users = await db.collection('users').deleteOne(
      { _id: new mongodb.ObjectId(id) },
      function () {
        res.json({
          message: "deleted succesfully"
        });
      }
    )
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })

  }

});

router.post('/follow/:id', async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params
    let data = {
      user_id: user_id,
      follower_id: id

    }
    await db.collection('followers').insertOne(data,

      function () {

        res.json({
          message: "Updated succesfully"
        });
      }
    )
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});

router.get('/followers/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    let followers = await db.collection('followers')
      .find({
        user_id: id
      })
      .toArray()
    res.json(followers);
  }
  catch (error) {
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});
module.exports = router;
