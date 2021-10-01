const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoConnect = require('../helpers/database')

let db;

(async () => {
    db = await mongoConnect();
    return db;
})();


const getUsersDao = async (id) => {
    try {
        return await db.collection('users')
            .find()
            .toArray()
    } catch (error) {
        console.log(error)
    }
}

const getUserDao = async (id) => {
    try {
        let user = await db.collection('users')
            .find({
                _id: new mongodb.ObjectId(id)
            })
            .toArray()
        return user[0]
    } catch (error) {
        console.log(error)
    }
}

const loginDao = async (email, password) => {
    try {
        let user = await db.collection('users')
            .findOne({
                email: email,
                password: password
            })
        if (user) {
            let jwt_token = jwt.sign({ id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            )
            return {
                statusCode: 200,
                response: {
                    token: jwt_token
                }
            }
        } else {
            return {
                statusCode: 403,
                response: {
                message: "incorrect email or password"
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const addUserDao = async (user) => {
    try {
        await db.collection('users').insertOne(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

const editUserDao = async (id, user) => {
    try {
        return await db.collection('users').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: user }, { upsert: true });
    } catch (error) {
        console.log(error)
    }
}

const deleteUserDao = async (id) => {
    try {
        return await db.collection('users').deleteOne(
            { _id: new mongodb.ObjectId(id) }
        )
    } catch (error) {
        console.log(error)
    }
}

const followUserDao = async (user_id, follower) => {
    try {
        let data = {
            user_id: user_id,
            follower_id: follower
        }
        await db.collection('followers').insertOne(data)
    } catch (error) {
        console.log(error)
    }
}

const getFollowersDao = async (id) => {
    try {
        return await db.collection('followers')
            .aggregate(
                [
                    {
                        $match: { user_id: id }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "follower_id",
                            foreignField: "_id",
                            as: "follower"
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            follower: { $arrayElemAt: ["$follower", 0] }
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$follower"
                        }
                    }
                ]
            )
            .toArray()
    } catch (error) {
        console.log(error)
    }
}

exports.getUsersDao = getUsersDao;
exports.getUserDao = getUserDao;
exports.loginDao = loginDao;
exports.addUserDao = addUserDao;
exports.deleteUserDao = deleteUserDao;
exports.editUserDao = editUserDao;
exports.followUserDao = followUserDao;
exports.getFollowersDao = getFollowersDao;