<h2>Xây dựng Website bán quần áo sử dụng công nghệ ReactJS & NodeJS ( API,Socket )</h2>
<h3>Mô tả chung , giới thiệu đề tài </h3>
<b>Ngày nay , công nghệ thông tin đã có những bước phát triển mạnh mẽ trong mọi phương diện nói chung ví dụ như : đời sống , công việc , giải trí , truyền thông , ... Và riêng với bán hàng , so với cách bán truyền thống thì nay doanh nghiệp , cửa hàng nhỏ lẻ nào cũng có một website để quáng bá , bán hàng trực tuyến sản phẩm và tương tác với người dùng . Nắm bắt được nhu cầu đó , nhóm em quyết định thực hiện đề tài : Xây dựng Website bán quần áo sử dụng công nghệ ReactJS & NodeJS ( API,Socket ) . Khi sử dụng trang web khách hàng sẽ cảm nhận được sự mới mẻ và thuận tiện của Website mang lại . Và website cũng dễ dàng cung cấp thông tin chi tiết sản phẩm giúp khách hàng có thể thanh toán trực tiếp qua paypal hoặc ship cod .</b>
<h3>Website bao gồm các chức năng chính: </h3>
    <b>- Thêm, Xóa, Tìm Kiếm, Phân Trang, Phân Loại Sản Phẩm </b> </br>
    <b>- Đặt Hàng </b> </br>
    <b>- Live Chat ( Tư Vấn Khách Hàng ) </b> </br>
    <b>- Gửi Email để xác nhận đơn hàng </b> </br>
    <b>- Thanh Toán Paypal  </b> </br>
    <b>- Giao Hàng ( Hiển thị và tính giá tiền của đơn hàng phụ thuộc vào quảng đường từ cửa hàng đến địa điểm nhận hàng của khách hàng và hiển thị bằng Google Map API )  </b> </br>


---------------------------------------------------------------

 
## Fear of God

![](https://thegioidohieu.com/images/feature_variant/17/fear-of-god-logo.jpg)


## Contributors
- TienKim
- QuocToan
- MinhHieu

## ERD
<img src="https://firebasestorage.googleapis.com/v0/b/erd-img.appspot.com/o/ERD-CNPMNC.PNG?alt=media&token=e4a97fe3-2cdd-4d60-8902-59c53bf911f7" />

## API
ROOT API ENDPOINT : http://tienkim9920.herokuapp.com

```bash

- api/product : PRODUCT API ENDPOINT

    - router.get('/', Products.index)

    - router.get('/category', Products.category)

    - router.get('/:id', Products.detail)

    - router.get('/category/gender', Products.gender)

    - router.get('/category/pagination', Products.pagination)

    - router.get('/scoll/page', Products.scoll)

    - module.exports = router
  
- api/user : USER API ENDPOINT

    - router.get('/', Users.index)

    - router.get('/:id', Users.user)

    - router.get('/detail/login', Users.detail)

    - router.post('/', Users.post_user)

    - module.exports = router;
   
- api/detail_order : DETAIL ORDER API ENDPOINT

    - router.get('/:id', Detail_Order.detail)

    - router.post('/', Detail_Order.post_detail_order)

    - module.exports = router

- api/order : ORDER API ENDPOINT

    - router.get('/order/:id', Order.get_order)

    - router.get('/order/detail/:id', Order.get_detail)

    - router.post('/order', Order.post_order)

    - router.post('/email', Order.send_mail)

    - module.exports = router

- api/delivery : DELIVERY API ENDPOINT

    - router.post('/', Delivery.post_delivery)

    - router.get('/:id', Delivery.get_delivery)

    - module.exports = router

- api/comment : COMMENT API ENDPOINT

    - router.get('/:id', Comment.index)

    - router.post('/:id', Comment.post_comment)

    - module.exports = router
    


```


## Get Started

``` bash
# install dependencies
npm install
```
``` bash
# run project
npm start
```

## Features
- Login, Register, Forgot Password, ResetPassword .
- CRUD Products, Users, Carts, Favorite, Order...
- Axios Products, Carts, Orders...
- Products url query (http://tienkim9920.herokuapp.com/api/product)
- Send email to user.
- Draw route between two location
- Payment on paypal
- Plugin Messenger of Facebook


## Technical details
- Nodejs, Reactjs.
- Express.
- Mongodb, Mongoose.
- Nodemailer.

