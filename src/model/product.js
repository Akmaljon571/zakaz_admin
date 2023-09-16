const { Schema, model } = require('mongoose')

const Product = new Schema({
    price: Number,
    olchov: String,
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'subCategory'
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

module.exports = model('Product', Product)
