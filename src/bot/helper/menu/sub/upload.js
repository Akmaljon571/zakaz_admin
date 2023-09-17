const { bot } = require("../../..")
const _var = require("../../../../content/_var")
const mainMenu = require("../../../../func/mainMenu")
const Admin = require("../../../../model/admin")
const SubCategory = require("../../../../model/subCategory")
const axios = require('axios');
const fs = require('fs')

module.exports = async (msg) => {
    const chatId = msg.chat.id
    
    if (msg.photo) {
        const fileId = msg.photo.at(-1).file_id        
        
        bot.getFileLink(fileId).then((photoUrl) => {
            const localFilePath = __dirname + `/upload/${fileId}.jpg`;
            console.log(localFilePath)
            axios({
              method: 'get',
              url: photoUrl,
              responseType: 'stream',
            })
              .then((response) => {
                const fileStream = fs.createWriteStream(localFilePath);
                response.data.pipe(fileStream);
        
                fileStream.on('finish', () => {
                  fileStream.close();
                });
              })
              .catch((error) => {
                console.error('Error downloading photo:', error);
                bot.sendMessage(chatId, 'Failed to save the photo.');
              });
          });


        const admin = await Admin.findOne({ chatId })
        const findSub = await SubCategory.findOne({ _id: admin.action.split('--')[1] })
        findSub.img = fileId
        await SubCategory.findByIdAndUpdate(findSub._id, findSub)
        bot.sendMessage(chatId, _var.save)
        await mainMenu(msg)
    } else {
        bot.sendMessage(chatId, _var.errUpload)
    }
}