const { bot } = require(".");
const _action = require("../content/_action");
const _admin = require("../content/_admin");
const Admin = require("../model/admin");
const assist = require("./helper/menu/newAssist/assist");
const error = require("./helper/menu/newAssist/error");
const menu = require("./helper/menu/menu");
const newAssist = require("./helper/menu/newAssist/newAssist");
const start = require("./helper/start");
const _var = require("../content/_var");
const back = require("./helper/back");
const mainCategory = require("./helper/menu/category/main");
const newCategory = require("./helper/menu/category/newCategory");
const delCategory = require("./helper/menu/category/delCategory");
const mainSub = require("./helper/menu/sub/main");
const findNewCategory = require("./helper/menu/sub/findNewCategory");
const findDelCategory = require("./helper/menu/sub/findDelCategory");
const newSub = require("./helper/menu/sub/newSub");
const delSub = require("./helper/menu/sub/delSub");
const mainPro = require("./helper/menu/product/main");
const findNewSub = require("./helper/menu/product/findNewSubPro.js");
const s16 = require("./helper/menu/product/s16");
const s18 = require("./helper/menu/product/s18");
const s20 = require("./helper/menu/product/s20");
const findDelSub = require("./helper/menu/product/findDelSub");
const s17 = require("./helper/menu/product/s17");
const s19 = require("./helper/menu/product/s19");
const upload = require("./helper/menu/sub/upload");

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    const admin = await Admin.findOne({ chatId }).lean()

    if (text == '/start') {
        await start(msg)
    } else if (text == _var.back) {
        await back(msg)
    } else if (admin) {
        if (admin.action == _action.s1) {
            await assist(msg)
        } else if (admin.action == _action.s2) {
            await menu(msg)
        } else if (admin.action == _action.s3 && admin.role == _admin.admin) {
            await newAssist(msg)
        } else if (admin.action == _action.s5) {
            await mainCategory(msg)
        } else if (admin.action == _action.s6) {
            await newCategory(msg)
        } else if (admin.action == _action.s7) {
            await delCategory(msg)
        } else if (admin.action == _action.s8) {
            await mainSub(msg)
        } else if (admin.action == _action.s9) {
            await findNewCategory(msg)
        } else if (admin.action == _action.s10) {
            await findDelCategory(msg)
        } else if (admin.action == _action.s11) {
            await newSub(msg)
        } else if (admin.action == _action.s12) {
            await delSub(msg)
        } else if (admin.action == _action.s13) {
            await mainPro(msg)
        } else if (admin.action == _action.s14) {
            await findNewSub(msg)
        } else if (admin.action == _action.s15) {
            await findDelSub(msg)
        } else if (admin.action == _action.s16) {
            await s16(msg)
        } else if (admin.action == _action.s17) {
            await s17(msg)
        } else if (admin.action == _action.s18) {
            await s18(msg)
        } else if (admin.action == _action.s19) {
            await s19(msg)
        } else if (admin.action.split('-')[0] == _action.s20) {
            await s20(msg)
        } else if (admin.action.split('--')[0] == _action.s21) {
            await upload(msg)
        }
    } else {
        await error(msg)
    }
})