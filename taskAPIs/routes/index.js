const express = require('express');
const router = express.Router();

const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");

let db

let connectionString = `mongodb://localhost:27017/twitter`

MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
  }
)

router.get('/', async (req, res, next) => {
  try {
    let users = await db.collection('users').find().toArray()
    res.json(users);

  }
  catch (error) {
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
    let { ops: users } = await db.collection('users').insertOne(user)
    console.log(users);
    res.json({
      message: "uSEr is CreATed SuccesFuLLy"
    })
  }
  catch (error) {
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
          message: "Users Updated succesfully"
        });
      }
    )
  }
  catch (error) {
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
          message: "Users deleted succesfully"
        });
      }
    )
  }
  catch (error) {

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
          message: "fOLLOWERS LIST Updated succesfully"
        });
      }
    )
  }
  catch (error) {
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
    res.status(400).json({
      message: "Something went wrong"
    })
  }
});
module.exports = router;
