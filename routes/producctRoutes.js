const { getProducts, createProduct, getProductById, deleteProductById, updateProductById } = require('../controller/userController');
const productRoutes = require('express').Router();
productRoutes.post('/', async (req, res) => {
    return await createProduct(req,res);
});
productRoutes.patch('/:id', async (req, res) => {
    return await updateProductById(req,res);
});
productRoutes.get('/:id', async (req, res) => {
    return await getProductById(req,res);
});
productRoutes.get('/', async (req, res) => {
    return await getProducts(req,res);
});
productRoutes.delete('/:id', async (req, res) => {
    return await deleteProductById(req,res);
});


module.exports = productRoutes;