const Provider = require('../models/providers.model');
const Product = require('../models/products.model');

const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find({}, '-_id -__v');
        res.status(200).json(providers);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createProvider = async (req, res) => {
    try {
        const result = await new Provider(req.body).save();
        res.status(201).json({message: "Proveedor creado", provider: result});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const updateProvider = async (req, res) => {
    try {
        const name = {company_name: req.body.company_name};
        const result = await Provider.findOneAndUpdate(name, req.body, {new: true});
        res.status(200).json({message: `Proveedor actualizado: ${req.body.company_name}`, provider: result});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const deleteProvider = async (req, res) => {
    try {
        const name = req.body.company_name;
        const products = await Product.find({"provider.name": name})
        if (products.length > 0) {
            res.status(409).json({message: `No se pudo borrar el proveedor '${req.body.company_name}' porque tiene productos asociados.`});
        } else {
            const result = await Provider.deleteOne({company_name: name});
            res.status(200).json({message: `Se ha borrado el proveedor: ${name}`});
        }
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getProviders,
    createProvider,
    updateProvider,
    deleteProvider
};

module.exports = controllers;
