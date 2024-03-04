const Monitors=require('../models/Monitor-schema');

const getMonitors=async (req,res)=>{
    try{
        const MonitorData=await Monitors.find({});
        res.status(200).json(MonitorData);
    }catch(error){
        console.log('error while fetching Monitors: ',error);
        return res.status(500).json({message:error.message});
    }
}
const getMonitorById=async (req,res)=>{
    try{
        console.log(req.params.id);
        const product=await Monitors.findOne({'id':req.params.id});
        res.status(200).json(product);
    }catch(error){
        console.log('error while fetching MonitorDetails: ',error);
        return res.status(500).json({message:error.message});
    }
}

module.exports={getMonitors,getMonitorById};