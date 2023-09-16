const { bot } = require("..")
const _action = require("../../content/_action")
const _admin = require("../../content/_admin")
const _var = require("../../content/_var")
const actionUpdate = require("../../func/action-update")
const adminKeyboard = require("../../func/keyboard/adminKeyboard")
const assistKeyboard = require("../../func/keyboard/assistKeyboard")
const Admin = require("../../model/admin")

const start = async (msg) => {
    const chatId = msg.chat.id
    const admin = await Admin.findOne({ chatId }).lean()

    // const newAdmin = new Admin({
    //     chatId,
    //     action: _action.s1,
    //     role: _admin.admin,
    //     name: "Akmal"
    // })
    // await newAdmin.save()
    if (admin?.role == _admin.admin) {
        await actionUpdate(chatId, _action.s2)
        bot.sendMessage(chatId, _var.helloAdmin, {
            reply_markup: {
                keyboard: adminKeyboard(),
                resize_keyboard: true,
            }
        })
    } else if (admin?.role == _admin.assist && admin.name) {
        await actionUpdate(chatId, _action.s2)
        bot.sendMessage(chatId, _var.helloAssist, {
            reply_markup: {
                keyboard: assistKeyboard(),
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.helloUser, {
            reply_markup: {
                keyboard: [[_var.tokenUser]],
                resize_keyboard: true
            }
        })
    }
}

module.exports = start