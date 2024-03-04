const mongoose = require('mongoose');

const MonitorSchema = new mongoose.Schema({
   id:String,
   url:String,
   detailUrl:String,
   title:Object,
   price:Object,
   quantity:Number,
   description:String,
   discount:String,
   tagline:String,
   rating:String,
   specifications:Array,
   brand:String
})

module.exports = mongoose.model('Monitors',MonitorSchema);