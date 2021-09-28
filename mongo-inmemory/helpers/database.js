const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = async () => {
    const mongo = await MongoMemoryServer.create({
        binary: {
            arch: "x64"
        }
    });
    const uri = mongo.getUri();
    console.log(uri)
  const Options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const client = new MongoClient(uri, Options)
  await client.connect();
  return client.db("dummy");
};

module.exports = mongoConnect;
