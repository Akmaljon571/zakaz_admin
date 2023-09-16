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

    if (text == _var.keyboradNewCategory) {
        await actionUpdate(chatId, _action.s6)
        bot.sendMessage(chatId, _var.newCategory, {
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else if (text == _var.keyboradDelCategory) {
        await actionUpdate(chatId, _action.s7)
        const allCategory = await Category.find().lean()

        bot.sendMessage(chatId, _var.delCategory, {
            reply_markup: {
                keyboard: allKeyboard(allCategory, _icon.del),
                resize_keyboard: true
            }
        })
    }
}