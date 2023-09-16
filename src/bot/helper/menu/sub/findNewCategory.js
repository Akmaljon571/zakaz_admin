const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split(' ').slice(1, -1).join(' ')

    const findCategory = await Category.findOne({ title: text }).lean()

    if (findCategory) {
        await actionUpdate(chatId, _action.s11)
        bot.sendMessage(chatId, _var.newSub + ' ' + text, {
            reply_markup: {
                force_reply: true,
                selective: true
            }
        })
    }
}