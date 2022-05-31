const otpService = require('../services/otp-services')
const hashService = require('../services/hash-service')
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')
class AuthController{
    async sendOtp(req, res){
        const {phone } = req.body
        if(!phone){
            return res.status(400).json({message: 'Phone field is required'})
        }
        // generate otp
        const otp = await otpService.generateOtp()
        //hash
        const ttl = 1000 * 60 * 2; //2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = hashService.hashOtp(data)

        //send otp
        try {
           // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'message sending failed'})
        }
    }

    // veryfy otp
    async verifyOtp(req, res){
        const {phone, otp, hash } = req.body
        if(!otp || !hash || !phone){
            res.status(400).json({message: 'All fields are required'})
        }
        const [ hashedOtp, expires ] = hash.split('.')
        if(Date.now() > +expires){
            res.status(400).json({message: 'otp has expired'})
        }

        const data = `${phone}.${otp}.${expires}`
        const isValid = otpService.verifyOtp(hashedOtp,data)
        if(!isValid){
            res.status(400).json({message: "invalid otp"})
        }

        let user;
        try {
            user = await userService.findUser({phone});
            if(!user){
                user = await userService.createUser({phone})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'db error'})
        }
        // generate token
        const { accessToken, refreshToken } = tokenService.generateToken({
            _id: user._id, 
            activated: false
        })
        
        await tokenService.storeRefreshToken(refreshToken,user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        const userDto = new UserDto(user)
        res.json({ user: userDto, auth: true })
    }

    async refresh(req,res){
        // get refresh token from cookie
        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        // check if token is valid
        let userData
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        } catch (error) {
            return res.status(401).json({message: "Invalid token"})
        }
        // check if toekn is in db
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                 refreshTokenFromCookie
                 )
            if(!token){
                return res.status(401).json({message: 'Invalid Token'})
            }     
        } catch (error) {
            return res.status(500).json({message: 'Internal error'})
        }
        // check if valid user
        const user = await userService.findUser({_id: userData._id})
        if(!user){
            return res.status(404).json({message: "user not found"})
        } 
        // generate new tokens
        const {refreshToken, accessToken} = tokenService.generateToken({_id: userData._id})

        //update refresh token
        try {
            await tokenService.updateRefreshToken(userData, refreshToken)
        } catch (error) {
            return res.status(500).json({message: 'Internal error'})
        }

        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        // response
        const userDto = new UserDto(user)
        res.json({ user: userDto, auth: true })
    }

    async logout(req, res){
        const { refreshToken } = req.cookies;
        // delete refresh token from db
        await tokenService.removeToken(refreshToken)
        // delete cookies
        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        res.json({user: null, auth: false})
    }
}

module.exports = new AuthController()