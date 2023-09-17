const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Admin = require("../../../../model/admin")
const SubCategory = require("../../../../model/subCategory")

module.exports = async (msg) => {
    const chatId = msg.chat.id

    if (msg.photo) {
        const fileId = msg.photo.at(-1).file_id
        const admin = await Admin.findOne({ chatId })
        const findSub = await SubCategory.findOne({ _id: admin.action.split('--')[1] })
        findSub.img = fileId
        console.log(findSub)
        await SubCategory.findByIdAndUpdate(findSub._id, findSub)
        bot.sendMessage(chatId, _var.save)
        await mainMenu(msg)
    } else {
        bot.sendMessage(chatId, _var.errUpload)
    }
}