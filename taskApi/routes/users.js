import express from 'express';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { request } from 'http';

const __dirname = path.resolve();

const router =express.Router();

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
    console.log('ROUTE REACHED');

    let rawdata = await fs.readFileSync(path.join(__dirname, '/routes' , 'user.json'));

    let data= await JSON.parse(rawdata);
    req.body.id=data.length+1;
    req.body.followers=[];
    await data.push(req.body);

    await fs.writeFile(path.join(__dirname, '/routes' , 'user.json'), JSON.stringify(data), function(err,result) {
        if(err) {
           console.log(err)
           
        }
    })
    
    console.log(req.body);

    
    console.log(data);

    res.send('ROUTE REACHED');
    
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
        res.status(402).json({
            message:"No one wants to follow you"
        });
    }
    else
    {
        res.json(followers);
    }
    
});
export default router;
