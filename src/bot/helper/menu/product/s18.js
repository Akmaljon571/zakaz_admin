const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const Product = require("../../../../model/product")
const SubCategory = require("../../../../model/subCategory")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const replyMessage = msg?.reply_to_message?.text
    
    if (replyMessage) {
        const reply = replyMessage.split('ning')[0]
        const findSub = await SubCategory.findOne({ title: reply })
        const newPro = new Product({
            olchov: text,
            subCategory: findSub._id
        })  
        await newPro.save()

        findSub.product.push(newPro._id)
        await findSub.save()
        await actionUpdate(chatId, _action.s20 + '-' + newPro._id)
        bot.sendMessage(chatId, reply + _var.saveProPrice, {
            reply_markup: {
                force_reply: true,
                selective: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.errPro)
    }
}
