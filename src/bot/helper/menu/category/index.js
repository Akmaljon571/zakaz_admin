const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id

    await actionUpdate(chatId, _action.s5)

    const category = await Category.find().lean()
    bot.sendMessage(chatId, _var.startCategory + category?.length + 'ta', {
        reply_markup: {
            keyboard: [[ _var.keyboradNewCategory, _var.keyboradDelCategory ], [ _var.back ]],
            resize_keyboard: true
        }
    })
}