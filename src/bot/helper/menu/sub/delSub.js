const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const SubCategory = require("../../../../model/subCategory")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split(' ').slice(1, -1).join(' ')
    
    const findSubCategory = await SubCategory.findOne({ title: text })
    await SubCategory.findByIdAndDelete(findSubCategory?._id)
    bot.sendMessage(chatId, _var.del)
    await mainMenu(msg)
}