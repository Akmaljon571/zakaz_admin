const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Product = require("../../../../model/product")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const olchov = msg.text?.split(' - ')[0]
    const price = Number(msg.text?.split(' - ')[1]?.split(" so'm")[0]?.split(' ')?.join(''))
    
    if (olchov && price) {
        const findPro = await Product.findOne({ olchov, price })
        await Product.findByIdAndDelete(findPro._id)
        bot.sendMessage(chatId, _var.del)
        await mainMenu(msg)
    }
}