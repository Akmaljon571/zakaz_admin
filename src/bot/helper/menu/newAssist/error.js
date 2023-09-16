const { bot } = require("../../../")
const _var = require("../../../../content/_var")
const Admin = require("../../../../model/admin")
const { verify } = require("../../../../utils/jwt")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    if (text.split('.')[0] == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9') {
        const assist = verify(text)
        if (assist && assist.text) {
            const findAssist = await Admin.findOne({ name: assist.text }).lean()
            if (findAssist) {
                findAssist.chatId = chatId
                await Admin.findByIdAndUpdate(findAssist._id, findAssist, { new: true })
                bot.sendMessage(chatId, _var.sendName, {
                    reply_markup: {
                        remove_keyboard: true
                    }
                })
            } else {
                bot.sendMessage(chatId, _var.errorToken)
            }
        } else {
            bot.sendMessage(chatId, _var.errorToken)
        }
    } else if (text == _var.tokenUser) {
        bot.sendMessage(chatId, _var.token, {
            reply_markup: {
                remove_keyboard: true
            }
        })
    } else {

    }
}