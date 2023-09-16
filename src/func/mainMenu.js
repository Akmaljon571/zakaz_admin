const { bot } = require("../bot")
const _action = require("../content/_action")
const _admin = require("../content/_admin")
const _var = require("../content/_var")
const Admin = require("../model/admin")
const actionUpdate = require("./action-update")
const adminKeyboard = require("./keyboard/adminKeyboard")
const assistKeyboard = require("./keyboard/assistKeyboard")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const admin = await Admin.findOne({ chatId }).lean()
    await actionUpdate(chatId, _action.s2)

    if (admin.role == _admin.admin) {
        bot.sendMessage(chatId, _var.main, {
            reply_markup: {
                keyboard: adminKeyboard(),
                resize_keyboard: true,
            }
        })
    } else {
        bot.sendMessage(chatId, _var.main, {
            reply_markup: {
                keyboard: assistKeyboard(),
                resize_keyboard: true
            }
        })
    }
}