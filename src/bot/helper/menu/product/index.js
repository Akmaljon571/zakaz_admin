const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const Product = require("../../../../model/product")

module.exports = async (msg) => {
    const chatId = msg.chat.id

    await actionUpdate(chatId, _action.s13)

    const product = await Product.find().lean()
    bot.sendMessage(chatId, _var.startProduct + product?.length + 'ta', {
        reply_markup: {
            keyboard: [[ _var.findNewCategory, _var.findDelCategory ], [ _var.back ]],
            resize_keyboard: true
        }
    })
}