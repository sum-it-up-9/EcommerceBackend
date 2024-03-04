const Monitors = require('./models/Monitor-schema');
const MonitorData= require('./constants/HomePageDta')


const insertMonitorData= async ()=>{
    try{
        //await Product.deleteMany({});
        await Monitors.insertMany(MonitorData);
        console.log('Data imported');
    }
    catch(error){
        console.log('error while importing data into db: ',error);
    }
}

module.exports= insertMonitorData;