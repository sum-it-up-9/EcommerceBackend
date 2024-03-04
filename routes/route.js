const express=require('express');
const router=express.Router();
console.log("router's index file loaded");
const Razorpay=require("razorpay");
const crypto=require("crypto");

const { getOrders,postOrder } = require('../controllers/order-controller');
const {userSignup,userLogin}=require('../controllers/user-controller');
const { getProducts } = require('../controllers/product-controller');
const {getMonitors,getMonitorById}= require('../controllers/monitor-controller')
// const {addPaymentGateway,paymentResponse }= require('../controllers/payment-controller')

router.post('/signup', userSignup);
router.post('/login',userLogin);

router.get('/products',getProducts);
router.get('/monitors',getMonitors);

router.get('/products/:id',getMonitorById);


router.get('/orders',getOrders);
router.post('/order',postOrder);

router.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
  });
  
// router.post('/callback', paymentResponse);

// router.post('/payment',addPaymentGateway);

router.post("/orders",async(req,res)=>{
  try{
    const instance=new Razorpay({
      key_id:process.env.KEY_ID,
      key_secret:process.env.KEY_SECRET,
    });

    const options = {
      amount:req.body.amount*100,
      currency:"INR",
      receipt:crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.status(500).json({message:"Something went Wrong"});
      }
      res.status(200).json({ data: order });

    })

  }catch(error){
    res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
  }
})

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});


module.exports =router;