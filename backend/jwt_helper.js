require('dotenv').config()
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={
            }
            const options={
                expiresIn:'2h',
                issuer:'AIRBAG RUTIER',
                audience:''+userId
            }
            jwt.sign(payload,process.env.TOKEN_SECRET,options, (err,token)=>{
                if(err){
                    return reject(createError[500])                    
                }
                resolve(token)
            })
        })
    },
}