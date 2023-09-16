const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split(' ').slice(1, -1).join(' ')


    const findCategory = await Category.findOne({ title: text }).lean()
    if (findCategory) {
        await Category.findByIdAndDelete(findCategory._id)

        bot.sendMessage(chatId, _var.del)
        await mainMenu(msg)
    }
}