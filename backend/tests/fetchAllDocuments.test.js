const mongoose = require('mongoose');
require('dotenv').config({ path: '../mongo.env' });

describe('Fetch All Documents', function() {
  let chai;
  let expect;
  let User;

  before(async function() {
    // Dynamically import chai and User model
    chai = await import('chai');
    expect = chai.expect;
    const userSchemaModule = await import('../src/Schema/userSchema.js');
    User = userSchemaModule.User;

    // Connect to the MongoDB database before running the tests
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async function() {
    // Disconnect from the MongoDB database after running the tests
    await mongoose.disconnect();
  });

  it('should fetch and print all users from the database', async function() {
    const users = await User.find({});
    console.log('Fetched users:', users);
  });
});