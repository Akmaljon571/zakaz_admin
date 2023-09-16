const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const Admin = require("../../../../model/admin")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const assist = await Admin.findOne({ chatId }).lean()

    if (assist.name == text) {
        await actionUpdate(chatId, _action.s2)

        bot.sendMessage(chatId, _var.assist)
    } else {
        bot.sendMessage(chatId, _var.errorAssist)
    }
}