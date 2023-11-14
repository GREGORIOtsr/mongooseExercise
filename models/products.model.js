const mongoose = require('mongoose');
require('../config/db_mongo')

const objectSchema = {
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    }
};

const productSchema = mongoose.Schema(objectSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
