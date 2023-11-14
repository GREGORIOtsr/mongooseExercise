const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product
            .find()
            .populate('provider', '-_id -__v')
            .select('-_id -__v');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createProduct = async (req, res) => {
    try{
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({message: `ERROR: No se han introducido datos`})
        } else {
            const {title, price, description, provider} = req.body;
            const providerRef = await Provider.find({company_name: provider});
            if (providerRef == '') {
                res.status(400).json({message: `ERROR: El provider: '${provider}' no existe`})
            } else {
                const provider_id = providerRef[0]._id.toString();
                const data = {
                    title,
                    price,
                    description,
                    provider: provider_id
                };
                let result = await new Product(data).save();
                res.status(201).json({message: "Producto creado", product: result});
            }
        }
    }catch (error) {
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

const updateProduct = async (req, res) => {
    try {
        const {title, price, description, provider} = req.body;
        if (provider) {
            const providerRef = await Provider.find({company_name: req.body.provider});
            const provider_id = providerRef[0]._id.toString();
            const data = {
                title,
                price,
                description,
                provider: provider_id
            }
            const result = await Product.findOneAndUpdate({title}, data, {new: true});
        } else {
            const result = await Product.findOneAndUpdate({title}, req.body, {new: true});
        }
        res.status(200).json({message: `Producto actualizado: ${req.body.title}`, product: result});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await Product.deleteOne({title: req.body.title});
        res.status(200).json({message: `Se ha borrado el producto: ${req.body.title}`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

module.exports = controllers;
