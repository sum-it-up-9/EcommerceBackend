const Product=require('../models/product-schema.js');

const getProducts=async (req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }catch(error){
        console.log('error while fetching products: ',error);
        return res.status(500).json({message:error.message});
    }
}

const getProductById=async (req,res)=>{
    try{
        console.log(req.params.id);
        const product=await Product.findOne({'id':req.params.id});
        res.status(200).json(product);
    }catch(error){
        console.log('error while fetching productDetails: ',error);
        return res.status(500).json({message:error.message});
    }
}


module.exports={getProducts,getProductById};