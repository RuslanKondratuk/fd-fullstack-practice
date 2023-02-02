const TokenError = require('../errors/TokenError');
const {verifyAccesToken} = require ('../services/tokenService');


module.exports.checkToken = async (req, res, next) => {
    try {
         const {headers: {authorization}} = req;
         if(!authorization) {
            throw new TokenError('You need authorization')
         }
         const [, token] = authorization.split(' ');
         req.payload = await verifyAccesToken(token);
         next();
    } catch (error) {
        next(error)
    }
};