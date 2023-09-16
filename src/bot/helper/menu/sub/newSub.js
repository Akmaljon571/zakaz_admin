const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const mainMenu = require("../../../../func/mainMenu")
const Category = require("../../../../model/category")
const SubCategory = require("../../../../model/subCategory")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const reply = msg?.reply_to_message?.text
    
    if (reply) {
        const findCategory = await Category.findOne({ title: reply.split(': ').reverse()[0] })
        const newSub = new SubCategory({
            title: text,
            category: findCategory._id
        })
        await newSub.save()

        findCategory.subCategory.push(newSub._id)
        await findCategory.save()
        await actionUpdate(chatId, _action.s21+ '--' + newSub._id)
        bot.sendMessage(chatId, _var.upload)
    } else {
        bot.sendMessage(chatId, _var.errSub)
    }
}
