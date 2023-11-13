const mongoose = require('mongoose');
require('../config/db_mongo')

const regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/;

const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true 
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true
    },
    address: { 
        type: String, 
        required: true 
    },
    url_web:{
        type: String,
        validate: {
            validator: function(url){
                if(regex.test(url))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Invalid url format."
        }
    }
};

const providerSchema = mongoose.Schema(objectSchema);

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
