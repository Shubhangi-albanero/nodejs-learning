const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
let server = require("../app.js");

chai.use(chaiHttp);
let userdata;
describe("users",()=>{
    describe("/GET /users",()=>{
        it("should get users",async()=> 
        {
            const res = await chai.request(server).get("/users");
            expect(res.statusCode).to.equal(200);
        })
    }
    )
    describe("/POST/users",()=>{
        it("should get users",async()=> 
        {
            let user={
                firstName:"Shubhangi",
                lastName:"Gupta",
                age:23
            }
            const res = await chai.request(server).post("/users").send(user);
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.a("object");
            userdata=res.body
        })
    }
    )
    describe("/PATCH/users",()=>{
        it("should update users",async()=> 
        { 
            let user={
                firstName:"Shubhangi",
                lastName:" Shah Gupta",
                age:23
            }
            let user_id=userdata._id;
            const res = await chai.request(server).patch(`/users/${user_id}`).send(user);
            expect(res.statusCode).to.equal(200);
        })
    }
    )
    describe("/DELETE/users/:id",()=>{
        it("should delete users",async()=> 
        {
            let user_id=userdata._id;
            const res = await chai.request(server).delete(`/users/${user_id}`);
            expect(res.statusCode).to.equal(200);
        })
    }
    )
})