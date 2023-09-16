const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const User = require("../../../../model/user")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    await actionUpdate(chatId, _action.s4)

    const users = await User.find().lean()
    let all = "Jami = " + users?.length + 'ta \n\n'

    if (users) {
        for (let i = 0; i < users.length; i++) {
            all += `${i + 1}. ${users[i].name} - ${users[i].createAt.toLocaleString().split(',')[0]} \n`
        }
    }

    bot.sendMessage(chatId, all, {
        reply_markup: {
            keyboard: [[_var.back]],
            resize_keyboard: true
        }
    })
}