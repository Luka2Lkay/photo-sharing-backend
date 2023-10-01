require("dotenv").config()

const secretKey = {
    secret: process.env.SECRET_KEY
}

module.exports = {secretKey}