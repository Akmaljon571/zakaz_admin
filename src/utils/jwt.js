const jwt = require("jsonwebtoken")

const sign = (name) => {
    return jwt.sign(name, process.env.SECRET_KEY)
}

const verify = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {
    sign, verify
}