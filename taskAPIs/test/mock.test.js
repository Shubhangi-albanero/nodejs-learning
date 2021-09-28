const chai = require("chai");
let expect = chai.expect;
let server = require("../app.js");

const mongoConnect = require('../helpers/mockdb')
let db;

(async () => {
  db = await mongoConnect();
  return db;
})();

describe("users",()=>{
    describe("add user",()=>{
        it("add user",async()=> 
        {
            let user={
                firstName:"Shubhangi",
                lastName:"Gupta",
                age:23
            }
            await db.collection('users').insertOne(user)
            expect(user).to.have.property('_id');
            expect(user).to.be.a("object");
            console.log(user)
        })
    }
    )
})

