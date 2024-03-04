const Product = require('./models/product-schema');
const prodcutData= require('./constants/productData')


const insertData= async ()=>{
    try{
        //await Product.deleteMany({});
        await Product.insertMany(prodcutData);
        console.log('Data imported');
    }
    catch(error){
        console.log('error while importinf data into db: ',error);
    }
}

module.exports= insertData;