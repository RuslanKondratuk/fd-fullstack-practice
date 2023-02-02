const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const ACCES_SECRET_VALUE = 'super-secret'
const REFRESH_SECRET_VALUE = 'refresh-super-secret';

const ACCES_TIME = 60;
const REFRESH_TIME = 60*60;

const promisifySignJWT = promisify(jwt.sign);
const promisifyVerifyJWT = promisify(jwt.verify)

module.exports.createAccesToken = async ({userId, email}) => await promisifySignJWT({userId, email}, ACCES_SECRET_VALUE, {
        expiresIn: ACCES_TIME
    });

module.exports.verifyAccesToken = async(token) => await promisifyVerifyJWT(token, ACCES_SECRET_VALUE);

module.exports.createRefreshToken = async ({userId, email}) => await promisifySignJWT({userId, email}, REFRESH_SECRET_VALUE, {
    expiresIn: REFRESH_TIME
});


module.exports.verifyRefreshToken = async(token) => await promisifyVerifyJWT(token, REFRESH_SECRET_VALUE);