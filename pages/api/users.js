const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const saltRounds = 10;
const url = 'mongodb://localhost:27017';
const dbName = 'simple-login-db';

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


/**
 * @function findUser finds a user in a database by email
 * @param {*} db 
 * @param {*} email 
 * @param {*} callback 
 */
function findUser(db, email, callback) {
    const collection = db.collection('user');
    collection.findOne({ email }, callback)
}
/**
 * @typedef {*} User
 */

/** https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255
 * @function createUser creates a user in the database.
 * @param {User} db 
 * @param {*} email 
 * @param {*} password 
 * @param {*} callback 
 */
function createUser(db, email, password, callback) {
    const collection = db.collection('user');
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in password database
        collection.insertOne(hash{
            userId: v4(),
            email,
            password: hash,
        }, callback); function(err, userCreated) {
            assert.strictEqual(err, null);
            callback(userCreated);
        }
    })
}