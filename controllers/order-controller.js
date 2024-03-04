const User=require('../models/user-schema.js');
// GET /orders - Retrieve orders for a user
const getOrders = async (req, res) => {
    try {
        // Retrieve the user ID from the request (assuming it's stored in req.userId)
        const userId = req.userId;

        // Find the user by ID and retrieve their orders
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the orders associated with the user
        return res.status(200).json({ orders: user.orders });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// POST /order - Create a new order for a user
const postOrder = async (req, res) => {
    try {
        // Retrieve the user ID from the request (assuming it's stored in req.userId)
       // const userId = req.body.email;

        // Retrieve order data from the request body
        const  orderData  = req.body;

        // Find the user by ID
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the new order to the user's orders array
        user.order.push(orderData);

        // Save the user document with the updated orders array
        await user.save();

        // Return a success response
        return res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getOrders, postOrder };