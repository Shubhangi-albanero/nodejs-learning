import express from 'express';

import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { request } from 'http';

const __dirname = path.resolve();

const router =express.Router();

let database

let connectionString = `mongodb://localhost:27017/twitter`

MongoClient.connect(connectionString, (err, db) => {
  // Database returned
  database=db.db()
});

router.get('/:id',async(req,res)=>{
    
    const { id } = req.params

    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    let userdata;
    await Promise.all(
      data.map((user)=>{
          if(user.id==id)
          {
              userdata=user;
          }
      })
    )

    if(!userdata)
    {
        res.status(404).json({
            message:"User not found"
        });
    }
    else
    {
        res.json(userdata);
    }
    
});


router.get('/',async (req,res) =>{
    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    res.json(data);
});

router.post('/',async(req,res)=>{

    let user=req.body
    console.log(user)
    database.collection('users').insertOne({name:"Shubhangi"}, function (
        err,
        info
      ) {
        res.json(info)
      })
    
});
router.patch('/:id',async(req,res)=>{
    
    const { id } = req.params

    const {firstName, LastName, age}=req.body
    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    await Promise.all(
      data.map((user)=>{
          if(user.id==id)
          {
              user.firstName=firstName;
              user.LastName=LastName;
              user.age=age;
          }
      })
    )

    await fs.writeFile(path.join(__dirname, '/routes' , 'user.json'), JSON.stringify(data), function(err,result) {
        if(err) {
           console.log(err)
           
        }
    })
    
    console.log(req.body);

    
    console.log(data);

    res.send('ROUTE REACHED');
    
});



router.delete('/:id',async(req,res)=>{
    
    const { id } = req.params

    const {firstName, LastName, age}=req.body
    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    await Promise.all(
      data=data.filter((user)=>{
          if(user.id!=id)
          {
              return user;
          }
      })
    )

    await fs.writeFile(path.join(__dirname, '/routes' , 'user.json'), JSON.stringify(data), function(err,result) {
        if(err) {
           console.log(err)
           
        }
    })
    
    console.log(req.body);

    
    console.log(data);

    res.send('ROUTE REACHED');
    
});

router.patch('/follow/:id',async(req,res)=>{
    
    const { id } = req.params

    const {userid}=req.body
    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    await Promise.all(
      data.map((user)=>{
          if(user.id==userid)
          {
              let followers=user.followers;
              followers.push(id);
              user.followers=followers;
          }
      })
    )

    await fs.writeFile(path.join(__dirname, '/routes' , 'user.json'), JSON.stringify(data), function(err,result) {
        if(err) {
           console.log(err)
           
        }
    })
    
    console.log(req.body);

    
    console.log(data);

    res.send('ROUTE REACHED');
    
});

router.get('/followers/:id',async(req,res)=>{
    
    const { id } = req.params

    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    let followers;

    await Promise.all(
      data.map((user)=>{
          if(user.id==id)
          {
              followers=user.followers;
          }
      })
    )

    if(!followers)
    {
        res.status(404).json({
            message:"No one wants to follow you"
        });
    }
    else
    {
        res.json(followers);
    }
    
});
export default router;
