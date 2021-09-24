var MongoClient = require( 'mongodb' ).MongoClient;
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( process.env.DATABASE_URL, function( err, client ) {
      _db = client.db();
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};