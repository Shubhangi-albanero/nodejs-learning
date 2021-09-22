const express = require('express');
const router = express.Router();

const mongodb =require("mongodb");
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

router.get('/', function(req, res, next) {
  db.collection('users')
  .find()
  .toArray(function (err, items) {
    res.json(items)
  })
});

router.get('/:id', function(req, res, next) {
  const { id } = req.params
  db.collection('users')
  .find({
    _id:new mongodb.ObjectId(id)
  })
  .toArray(function (err, items) {
    res.json(items)
  })
});

router.post('/', function(req, res, next) {
  const {firstName, lastName, age}=req.body;
  let user={
    firstName:firstName,
    lastName:lastName,
    age:age
  }
  db.collection('users').insertOne(user, function (
    err,
    info
  ) {
    res.json(info)
  })
});

router.patch('/:id', function(req, res, next) {
  const {firstName, lastName, age}=req.body;
  const { id } = req.params
  let user={
    firstName:firstName,
    lastName:lastName,
    age:age
  }
  db.collection('users').findOneAndUpdate(
    { _id: new mongodb.ObjectId(id) },
    { $set: user },
    function () {
      
      res.json({
        message:"Users Updated succesfully"
      });
    }
  )
});


router.delete('/:id', function(req, res, next) {
  const { id } = req.params
  db.collection('users').deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function () {
      res.json({
        message:"Users deleted succesfully"
      });
    }
  )

});

router.post('/follow/:id', function(req, res, next) {
  const {user_id}=req.body;
  const { id } = req.params
  let data={
    user_id:user_id,
    follower_id:id

  }
  db.collection('followers').insertOne(data,
    
    function () {
      
      res.json({
        message:"fOLLOWERS LIST Updated succesfully"
      });
    }
  )
});

router.get('/followers/:id', function(req, res, next) {
  const { id } = req.params
  db.collection('followers')
  .find({
    user_id:id
  })
  .toArray(function (err, items) {
    res.json(items)
  })
});
module.exports = router;
