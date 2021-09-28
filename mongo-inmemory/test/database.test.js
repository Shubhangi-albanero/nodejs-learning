const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('chai').assert

chai.use(chaiHttp);
describe("database",()=>{
    it("should connect to database",async()=> 
        {
            MongoClient.connect(
                process.env.DATABASE_URL
              )
                .then(client => {
                    assert.isOk("database connected succesfullly")
                })
                .catch(err => {
                  assert.fail('database connection failed')
                });
        })
})
