const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Category = require("../../../../model/category")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    const newCategory = new Category({
        title: text
    })
    await newCategory.save()
    bot.sendMessage(chatId, _var.save)
    await mainMenu(msg)
}