const express = require('express')
const app = express()
const http = require('http').Server(app);

const cors = require("cors");
const PORT = process.env.PORT || 8000

const ProductAPI = require('./API/Router/product.router')
const UserAPI = require('./API/Router/user.router')
const CartAPI = require('./API/Router/cart.router')
const OrderAPI = require('./API/Router/order.router')
const Detail_OrderAPI = require('./api/Router/detail_order.router')
const CommentAPI = require('./API/Router/comment.router')
const DeliveryAPI = require('./API/Router/delivery.router')

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CNPM", {
  useFindAndModify: false,
  useCreateIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/Product', ProductAPI)
app.use('/api/User', UserAPI)
app.use('/api/Cart', CartAPI)
app.use('/api/Payment', OrderAPI) // order
app.use('/api/DetailOrder', Detail_OrderAPI) // detail_order
app.use('/api/Comment', CommentAPI)
app.use('/api/Delivery', DeliveryAPI) // delivery


http.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});