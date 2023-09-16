const { bot } = require("..")
const _action = require("../../content/_action")
const _admin = require("../../content/_admin")
const _var = require("../../content/_var")
const actionUpdate = require("../../func/action-update")
const adminKeyboard = require("../../func/keyboard/adminKeyboard")
const assistKeyboard = require("../../func/keyboard/assistKeyboard")
const mainMenu = require("../../func/mainMenu")
const Admin = require("../../model/admin")

module.exports = async (msg) => {
    const chatId = msg.chat.id
    const admin = await Admin.findOne({ chatId }).lean()

    if (admin.action == _action.s4 || admin.action == _action.s5 || admin.action == _action.s7 || admin.action == _action.s8 || admin.action == _action.s9 || admin.action == _action.s10 || admin.action == _action.s11 || admin.action == _action.s12 || admin.action == _action.s13 || admin.action == _action.s14 || admin.action == _action.s15 || admin.action == _action.s16 || admin.action == _action.s17 || admin.action == _action.s19) {
        await mainMenu(msg)
    }
}