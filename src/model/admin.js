const { Schema, model } = require('mongoose')

const Admin = new Schema({
    chatId: String,
    role: String,
    action: String,
    name: String
})

module.exports = model('Admin', Admin)
