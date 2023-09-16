const _var = require("../../content/_var")

module.exports = (arr, icon) => {
    const a = []

    for (let i = 0; i < arr.length; i++) {
        a.push([`${i + 1}. ${arr[i]?.title} ${icon}`, arr[i++] && arr[i]?.title ? `${i + 1}. ${arr[i]?.title} ${icon}` : null].filter(e => e))
    }
    a.push([ _var.back ])
    return a
}