const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _icon = require("../../../../content/_icon")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const allKeyboard = require("../../../../func/keyboard/allKeyboard")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const allCategory = await Category.find().lean()

    if (text == _var.findNewCategory) {
        await actionUpdate(chatId, _action.s9)
        bot.sendMessage(chatId, _var.findNewCategory, {
            reply_markup: {
                keyboard: allKeyboard(allCategory, _icon.create),
                resize_keyboard: true
            }
        })
    } else if (text == _var.findDelCategory) {
        await actionUpdate(chatId, _action.s10)

        bot.sendMessage(chatId, _var.findDelCategory, {
            reply_markup: {
                keyboard: allKeyboard(allCategory, _icon.update),
                resize_keyboard: true
            }
        })
    }
}