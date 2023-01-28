const {User} = require('../models')
const bcrypt = require ('bcryptjs')
const NotFoundError = require('../errors/NotFound');
const InvalidDataError = require('../errors/InvalidDataError');

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
            console.log(result );
            if(result) {
                res.status(200).send({data: findUser});
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