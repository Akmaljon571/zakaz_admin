const { bot } = require("../..")
const _action = require("../../../content/_action")
const _admin = require("../../../content/_admin")
const _var = require("../../../content/_var")
const actionUpdate = require("../../../func/action-update")
const Admin = require("../../../model/admin")
const category = require("./category")
const product = require("./product")
const sub = require("./sub")
const users = require("./users")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const admin = await Admin.findOne({ chatId }).lean()

    if (text == _var.newAssist && admin?.role == _admin.admin) {
        await actionUpdate(chatId, _action.s3)
        
        bot.sendMessage(chatId, _var.nameAssist, {
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else if (text == _var.users) {
        await users(msg)
    } else if (text == _var.category) {
        await category(msg)
    } else if (text == _var.subCategory) {
        await sub(msg)
    } else if (text == _var.product) {
        await product(msg)
    }
}