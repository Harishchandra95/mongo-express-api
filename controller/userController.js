const Product = require("../models/Product");
module.exports = {
    createProduct: async function (req, res) {
        try{
            const {name, quantity, price, image} = req.body;
            const createProductPipe = new Product({name, quantity: quantity ? quantity : 0,price: price ? price : 0, image: image ? image : ''})
            await createProductPipe.save();
            return res.status(201).json({message: 'Product created successfully!!'})
        } catch(error) {
            return res.status(401).json({message: error.message || 'somthing went wrong'})
        }
    },
    updateProductById: async function (req, res) {
        try{
            const {name, quantity, price, image} = req.body;
            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, {name, quantity, price, image});
            if(!product) {
                return res.status(404).json({message: 'Product Not Found'});   
            }
            const data = await Product.findById({_id:id});
            return res.status(200).json({message: 'Product updated successfully!!', data})
        } catch(error) {
            return res.status(401).json({message: error.message || 'somthing went wrong'})
        } 
    },
    getProductById: async function (req, res) {
        try{
            const { id } = req.params;
            const data = await Product.findById({_id: id});
            return res.status(200).json({message: 'Product successfully fetch!!',  data})
        } catch(error) {
            return res.status(401).json({message: error.message || 'somthing went wrong'})
        }
    },
    deleteProductById: async function (req, res) {
        try{
            const {id} = req.params;
            const product = await Product.findById(id);
            console.log(product);
            if(!product) {
                return res.status(404).json({message: 'Product Not Found'});
            }
            await Product.findByIdAndDelete(id);
            return res.status(200).json({message: 'Product deleted successfully!!'})
        } catch(error) {
            console.log(error);
            return res.status(401).json({message: error.message || 'somthing went wrong'})
        }
    },
    getProducts: async function (req, res) {
        try{
            const products = await Product.find({});
            return res.status(200).json({message: 'Product successfully fetch!!', data: products})
        } catch(error) {
            return res.status(401).json({message: error.message || 'somthing went wrong'})
        }
    }
}