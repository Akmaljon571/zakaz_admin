const { bot } = require("../../..")
const _action = require("../../../../content/_action")
const _icon = require("../../../../content/_icon")
const _var = require("../../../../content/_var")
const actionUpdate = require("../../../../func/action-update")
const allKeyboard = require("../../../../func/keyboard/allKeyboard")
const mainMenu = require("../../../../func/mainMenu")
const summa = require("../../../../func/summa")
const SubCategory = require("../../../../model/subCategory")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text.split(' ').slice(1, -1).join(' ')
    await actionUpdate(chatId, _action.s19)

    const findSub = await SubCategory.findOne({ title: text }).populate('product')

    const a = []
    const arr = findSub?.product

    if (findSub && arr.length) {
        for (let i = 0; i < arr.length; i++) {
            a.push([`${arr[i]?.olchov} - ${summa(arr[i]?.price)} so'm ${_icon.del}`, arr[i++] && arr[i]?.title ? `${arr[i]?.olchov} ${arr[i]?.title}  - ${summa(arr[i]?.price)} so'm ${_icon.del}` : null].filter(e => e))
        }
        a.push([ _var.back ])
        bot.sendMessage(chatId, text + _var.delPro, {
            reply_markup: {
                keyboard: a,
                resize_keyboard: true
            }
        })
    } else {
        bot.sendMessage(chatId, _var.nullPro, {
            reply_markup: {
                keyboard: [[ _var.back ]],
                resize_keyboard: true
            }
        })
    }
}