const express = require('express')
const app = express()
const http = require('http').Server(app);

// Khởi tạo paypal
var paypal = require('paypal-rest-sdk');

// const io = require('socket.io')(http);

const cors = require("cors");
const port = 8000

const ProductAPI = require('./API/Router/product.router')
const UserAPI = require('./API/Router/user.router')
const CartAPI = require('./API/Router/cart.router')
const OrderAPI = require('./API/Router/order.router')
const HistoryAPI = require('./API/Router/history.router')
const CommentAPI = require('./API/Router/comment.router')
const DeliveryAPI = require('./API/Router/delivery.router')

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Clothes", {
  useFindAndModify: false,
  useCreateIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});




var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Cài đặt config cho paypal
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZs1BwWM6IlHg7FFjBOURgGUuObrQmEKguSVbowu4ZqOuH7n2em2NBDmzBoQOqrUsgV-CVAsylOOB5ve', // Thông số này copy bên my account paypal
  'client_secret': 'ELcS0dYevQhG7LZrBQ-fdOpPXINVQXfKQCzh8f7uFpM2vpO_g0hz5K4rk2tg1dO5p2Hzxvsx-m2fn0QU' // Thông số này cùng vậy
});

app.use('/api/Product', ProductAPI)
app.use('/api/User', UserAPI)
app.use('/api/Cart', CartAPI)
app.use('/api/Payment', OrderAPI)
app.use('/api/History', HistoryAPI)
app.use('/api/Comment', CommentAPI)
app.use('/api/Delivery', DeliveryAPI)


http.listen(port, () => {
    console.log('listening on *: ' + port);
});