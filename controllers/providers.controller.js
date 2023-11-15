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
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({message: `ERROR: No se han introducido datos`})
        } else {
            const result = await new Provider(req.body).save();
            res.status(201).json({message: "Proveedor creado", provider: result});
        }
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
        const providerRef = await Provider.find({company_name: name});
        if (providerRef.length === 0) {
            res.status(400).json({message: `ERROR: no existe el proveedor '${name}'`})
        } else {
            const provider_id = providerRef[0]._id.toString();
            const products = await Product.find({"provider": provider_id});
            console.log(products);
            if (products.length > 0) {
                res.status(409).json({message: `No se pudo borrar el proveedor '${name}' porque tiene productos asociados.`});
            } else {
                const result = await Provider.deleteOne({company_name: name});
                res.status(200).json({message: `Se ha borrado el proveedor: ${name}`});
            }
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
