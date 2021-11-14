import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//Create new order, POST /api/orders, access:private
const createOrder = asyncHandler(async(req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }

  res.json();
});


//Get order by id, GET /api/orders/:id, access:private
const getOrderById = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if(order && (req.user.isAdmin || order.user._id.equals(req.user._id))){
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


//Update order to paid, GET /api/orders/:id/pay, access:private
const updateOrderToPaid = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id);

  if(order && (req.user.isAdmin || order.user._id.equals(req.user._id))){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Get logged in user orders, GET /api/orders/myorders
const getUserOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({ user: req.user._id });
  console.log('this is orders', orders);

  res.json(orders);
});

export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
};
