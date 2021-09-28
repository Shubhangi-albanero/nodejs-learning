const { MongoMemoryServer } = require('mongodb-memory-server');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoServer = new MongoMemoryServer();

const mongoConnect = async () => {
    const mongo = await MongoMemoryServer.create({
        binary: {
            arch: "x64"
        }
    });
    const uri = mongo.getUri()+'Dummy';
    console.log(uri)
  const Options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  const client = new MongoClient(uri, Options)
  await client.connect();
  _db = client.db();
  return client.db();
};

module.exports = mongoConnect;

