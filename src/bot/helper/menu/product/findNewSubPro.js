const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _icon = require("../../../../content/_icon")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const allKeyboard = require("../../../../func/keyboard/allKeyboard")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split(' ').slice(1, -1).join(' ')
    await actionUpdate(chatId, _action.s16)
    const findCategory = await Category.findOne({ title: text }).populate('subCategory')

    if (findCategory && findCategory?.subCategory?.length) {
        bot.sendMessage(chatId, _var.findNewSubPro, {
            reply_markup: {
                keyboard: allKeyboard(findCategory.subCategory, _icon.create),
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.nullSub, {
            reply_markup: {
                keyboard: [[ _var.back ]],
                resize_keyboard: true
            }
        })
    }
}