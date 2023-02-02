const {User, RefreshToken} = require('../models')
const bcrypt = require ('bcryptjs')
const NotFoundError = require('../errors/NotFound');
const InvalidDataError = require('../errors/InvalidDataError');
const TokenError = require('../errors/TokenError')
const {createAccesToken, createRefreshToken, verifyRefreshToken} = require('../services/tokenService');

module.exports.signUpUser = async (req, res, next) =>  {
    try {
        const {body, passwordHash} = req;
        const createdUser = await User.create({...body, passwordHash});
        res.status(201).send({data: createdUser});
    } catch (error) {
        next(error)
    }
}
module.exports.signInUser = async (req, res, next) =>  {
    try {
        const {body: {password, email}} = req;
        const findUser = await User.findOne({
            email: email
        });
        if(findUser) {
            const result = await bcrypt.compare(password, findUser.passwordHash)
            if(result) {
                const accesToken = await createAccesToken({userId: findUser._id, email: findUser.email});
                const refreshToken = await createRefreshToken({userId: findUser._id, email: findUser.email});

                const addedToken = await RefreshToken.create({
                    token: refreshToken,
                    userId: findUser._id
                })
                res.status(200).send({data: findUser, tokens: {
                    accesToken, refreshToken
                }});
            } else {
                throw new InvalidDataError('Invalid credentials');
            }

        } else {
            throw new NotFoundError('User not found')
        }
    } catch (error) {
        next(error)
    }
}

module.exports.getOneUser = async (req, res, next) => {

}

module.exports.refreshSession = async (req, res, next) => {
    const {body, body: {refreshToken}} = req;
    let verifyPayload
    try {
        verifyPayload = await verifyRefreshToken(refreshToken);
    } catch (err) {
        next(new TokenError('Invalid'))
    }

    try {

        if(verifyPayload) {
            const foundUser = await User.findOne({
                email: verifyPayload.email
            });
            const rtFromDb = await RefreshToken.findOne ({
                $and: [{
                    token: refreshToken
                }, {userId: foundUser._id}]
            })

            if(rtFromDb) {
                const removeRes = await rtFromDb.deleteOne();
                const newAccesToken = await createAccesToken({userId: foundUser._id, email: foundUser.email});
                const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                const addedToken = await RefreshToken.create({
                    token: newRefreshToken,
                    userId: foundUser._id
                })
                res.status(200). send({
                    tokens: {
                        accesToken: newAccesToken,
                        refreshToken: newRefreshToken
                    }
                })
            }
        } else {
             throw new TokenError('Token not found')
        }
    }catch (error) {
        next(error)
    }
}