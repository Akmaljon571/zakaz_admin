const Admin = require("../model/admin")

module.exports = async (chatId, action) => {
    const findAdmin = await Admin.findOne({ chatId }).lean()
    findAdmin.action = action
    await Admin.findByIdAndUpdate(findAdmin._id, findAdmin, { new: true })
}