const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _admin = require("../../../../content/_admin")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const adminKeyboard = require("../../../../func/keyboard/adminKeyboard")
const Admin = require("../../../../model/admin")
const { sign } = require("../../../../utils/jwt")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if (text == '/ortga') {
        await actionUpdate(chatId, _action.s2)

        bot.sendMessage(chatId, _var.main, {
            reply_markup: {
                keyboard: adminKeyboard(),
                resize_keyboard: true
            }
        })
    } else {
        const already = await Admin.findOne({ name: text }).lean()
        if (already) {
            await actionUpdate(chatId, _action.s2)

            bot.sendMessage(chatId, _var.errorName, {
                reply_markup: {
                    keyboard: adminKeyboard(),
                    resize_keyboard: true
                }
            })
        } else {
            const newAdmin = new Admin({
                action: _action.s1,
                role: _admin.assist,
                name: text
            })
            await newAdmin.save()
            await actionUpdate(chatId, _action.s2)
            bot.sendMessage(chatId, `${_var.sendToken} \n\n${sign({text})}`)
            bot.sendMessage(chatId, _var.main, {
                reply_markup: {
                    keyboard: adminKeyboard(),
                    resize_keyboard: true
                }
            })
        }
    }
}