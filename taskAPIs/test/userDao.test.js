const chai = require("chai");
let expect = chai.expect;
let chaiHttp = require("chai-http");
const {
    getUsersDao,
    getUserDao,
    loginDao,
    addUserDao,
    editUserDao,
    deleteUserDao,
    getFollowersDao,
    followUserDao,
    connectDB
  } = require("../dao/userDao")
let userData;
let token;

(async()=> {
  connectDB()
})()

describe("Dao tests", () => {
  describe("user signup", () => {
    it("creates user", async () => {
        let user = {
            firstName: "shubhangi",
            lastName: "gupta",
            age: 22,
            email: "shubhangi1@gmail.com",
            password: "password"
          }
        let response = await addUserDao(user);
        console.log(response)
        expect(response).to.be.a("object");
    });
  });

  describe("login user", () => {
    it("login into the application", async () => {
        let user = {
            email: "shubhangi1@gmail.com",
            password: "password"
        }
        let {statusCode, response} = await loginDao(user.email, user.password)
        token = response.token
        expect(response).to.be.a("object");
    });
  });
  describe("get users", () => {
    it("should get all users", async () => {
      let response = await getUsersDao();
      userData = response
      expect(response).to.be.a("array");
    });
  });

  describe("get user", () => {
    it("should get one user", async () => {
      let response = await getUserDao(userData._id);
      expect(response).to.be.a("object");
    });
  });

  describe("user edit", () => {
    it("should edit user", async () => {
        let user = {
            firstName: "shubhangi",
            lastName: "gupta",
            age: 22
          }
        let response = await editUserDao(userData.id, user);
        expect(response).to.be.a("object");
    });
  });

  describe("delete user", () => {
    it("should delete user", async () => {
        let response = await deleteUserDao(userData.id)
        expect(response).to.be.a("object");
    });
  });

  describe("server.followone", () => {
    it(" follow user", async () => {
      let user_id = "6149e4b38a270a0a71386765"
      let follower_id = "615597a25c40e334ac3e66c0"
      let response = await followUserDao(user_id, follower_id)
      expect(response).to.be.a("object");
    });
  });

  describe("get followers", () => {
    it("should get followers of user", async () => {
      let followers = await getFollowersDao("6149e4b38a270a0a71386765");
      expect(followers).to.be.a("array");
    });
  });

});