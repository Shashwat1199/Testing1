const Razorpay = require('razorpay');
const Order = require('../models/orders')
const userController = require('../controllers/user')
require('dotenv').config();

exports.purchasePremium = async(req, res) => {

  console.log("Getting  inside here")
  var rzp = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
 
 const amount = 2500;
  try {
     rzp.orders.create({amount, currency : "INR"},(err,order)=>{
      if(err){
      console.log("Here's the error >> " + err + "order>> "+ order);  
      throw new Error(JSON.stringify(err));
      }

      //console.log("Order is with id >>> " + order.id);
      req.user.createOrder({orderid: order.id, status: 'PENDING'}).then(()=>{
        //console.log("Working here man!")
        return res.status(201).json({order, key_id : rzp.key_id});
      })
      .catch(err=>{
      //console.log("Error is here>>> " +  err);
      throw new Error(JSON.stringify(err));
      })

     });     
  } 
  catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Something went wronggs', error:err });
  }
} 

exports.updateTransactionStatus = async (req, res) => {
  console.log("going inside in UTS") 
  try{
     const {payment_id, order_id} = req.body;
     //console.log("Reaching upto here and>> " + req.body);

     const order = await Order.findOne({where: {orderid : order_id}})
     //console.log("Reaching upto here &>> " + order);

     const promise1 = await order.update({paymentid : payment_id, status : 'SUCCESSFUL'})
     const promise2 = await req.user.update({ispremiumuser : true})
     //console.log("Reaching upto here and>> " + order);
     Promise.all([promise1, promise2]).then(()=>{
     return res.status(202).json({success: true , message : "Tranasaction Successfull", token: userController.generateAccessToken(req.user.id, true)});
    }).catch((err)=>{
      throw new Error(err);
    })
  }
  catch (err) {
    //console.log("Update Transaction Status error " +  err);
    res.status(403).json({ message: 'Something went wrongggg', error:err });
  }
};