const jwt = require('jsonwebtoken');
const RefreshModel = require('../models/refresh-model');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m'
        })
        
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        })
        
        return { accessToken, refreshToken }
    }

    async storeRefreshToken(token, userId){
        try {
            await RefreshModel.create({
                token,
                userId
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    async verifyAccesToken(token){
        return jwt.verify(token, accessTokenSecret)
    }

    async verifyRefreshToken(refreshToken){
        return jwt.verify(refreshToken, refreshTokenSecret)
    }

    async findRefreshToken(userId, refresToken){
        return await RefreshModel.findOne({userId: userId, token: refresToken})
    }

    async updateRefreshToken(userId, refreshToken){
        return await RefreshModel.updateOne(
            {userId: userId}, 
            {token: refreshToken}
            )
    }

    async removeToken(refreshToken){
        return await RefreshModel.deleteOne({token: refreshToken})
    }
}

module.exports = new TokenService();