const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Admin = require("../../../../model/admin")
const Product = require("../../../../model/product")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const reply = msg?.reply_to_message?.text
    const admin = await Admin.findOne({ chatId })

    if (reply) {
        const price = Number(text.split(' ').join(''))
        if (price) {
            const findPro = await Product.findOne({ _id: admin?.action.split('-')[1] })
            findPro.price = price
            await Product.findByIdAndUpdate(findPro._id, findPro)
            bot.sendMessage(chatId, _var.save)
            await mainMenu(msg)
        } else {
            bot.sendMessage(chatId, _var.errorPro)
        }
    } else {
        bot.sendMessage(chatId, _var.errPro)
    }
}
