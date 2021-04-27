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




 
## 🚀 PookBook Server 

[![](https://img.shields.io/badge/Facebook-CodingwithVudang-blue)](https://www.facebook.com/codingwithvudang)
[![](https://img.shields.io/badge/Gmail-codingwithvudang@gmail.com-red)](mailto:codingwithvudang@gmail@gmail.com)

<div >
<img width="400px" height="400px" src="https://res.cloudinary.com/codingwithvudang/image/upload/v1618561426/SplashScreen_2x_s5hpib.png" >
<img width="400px" height="400px" src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/151284066_207254161142817_5812038792384707893_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=KAVSahpcm04AX_lEqGb&_nc_ht=scontent.fsgn2-1.fna&oh=f8f95fca5dcb99c3592f41127391cf3c&oe=609E2BB1" >
</div>


## 🚀 Contributors
- Vudang

## 🚀 ERD
<img src="https://res.cloudinary.com/codingwithvudang/image/upload/v1618992281/image_l345jz.png" />

## 🚀 API DOCS
ROOT API ENDPOINT : http://codingwithvudang-bookserver.herokuapp.com ( havent upgraded yet )

```bash

- api/v1/products : PRODUCT API ENDPOINT
  - ROUTER.get('/',PRODUCT_CONTROLLER.GET_LIST_PRODUCTS)
  - ROUTER.post(
     '/',upload.single('imageUrl'),
     resize,
     PRODUCT_CONTROLLER.CREATE_PRODUCT);
  - ROUTER.patch(
     '/:id',
     upload.single('imageUrl'),
     resize,
     PRODUCT_CONTROLLER.UPDATE_PRODUCT);
   - ROUTER.delete('/:id',PRODUCT_CONTROLLER.DELETE_PRODUCT)
  
- api/v1/users : USER API ENDPOINT
   - router.post("/register", USER_REGISTER);
   - router.post("/login", USER_LOGIN);
   - router.patch("/:id", verifyToken, USER_EDIT);
   - router.post("/reset_password", USER_RESET_PASSWORD);
   - router.post("/receive_new_password/:userId/:token", USER_RECEIVE_NEW_PASSWORD);
   - router.patch(
     "/photo/:id",
     verifyToken,
     upload.single("profile"),
     USER_UPLOAD_PHOTO
   );
   
- api/v1/favorites : FAVORITE API ENDPOINT
    - router.get('/', verifyToken, GET_FAVORITES);
    - router.post('/', verifyToken, POST_FAVORITE);
    - router.patch('/:userId', verifyToken, DELETE_FAVORITE_ITEM);

- api/v1/orders : ORDER API ENDPOINT
    - router.get('/',verifyToken,GET_ORDERS);
    - router.post('/', verifyToken, CREATE_ORDER);
    - router.patch('/:id', verifyToken, UPDATE_ORDER);

- api/v1/products : CART API ENDPOINT
    - router.get('/', verifyToken, GET_CART);
    - router.post('/', verifyToken,CREATE_CART);
    - router.put('/:id', verifyToken, UPDATE_CART);
    - router.delete('/cartitem/:id', verifyToken, DELETE_CART_ITEM);
    - router.delete('/:id', verifyToken, DELETE_CART);
    
- api/v1/warehouse : WAREHOUSE API ENDPOINT
- api/v1/categories : CATEGORIES API ENDPOINT
- api/v1/authors : AUTHORS API ENDPOINT
- api/v1/publishers : PUBLISHER API ENDPOINT
- api/v1/providers : PROVIDERS API ENDPOINT
- api/v1/status : STATUS API ENDPOINT
- api/v1/payment-method : PAYMENT METHOD API ENDPOINT


```

## 🚀 Example Request
**Please provider auth-token (JWT) in Headers of Request**

**CREATE NEW ORDER**
- POST localhost:8080/api/v1/orders
- Test on local :  Headers : auth-token (JWT token) Body (JSON form )
- Request Body : 

```json
{
"orderInfo": {
    "totalAmount": 5000,
    "userId" : "607ec5f6e3a5d0091ff78025",
    "items":[
        {
            "item":"60796508f7359b10225c5daa",
            "quantity":10
        },
        {
            "item":"607f074e3ca27f92d39fcf20",
            "quantity":10
        }
    ],
    "name": "Vudang",
    "address" : "67 Huynh Thien Loc",
    "phone":"09667881234",
    "paymentMethod":"607fe47b4ebfda44935ff96b",
    "status":"607fe50d4ebfda44935ff971"
},
    "token":"TestToken"
}

```

**LOGIN**
- POST localhost:8080/api/v1/user/login
- Request Body : 
```json
{
    "email":"admin@gmail.com",
    "password":"admin",
    "pushTokens" :[]
}
```

**ADD TO CART**
- POST localhost:8080/api/v1/carts
- Test on local :  Headers : auth-token (JWT token) Body (JSON form )
- Request Body : 

```json
{
    "userId": "605048dbcafa1206c221d275",
    "items": [
        {
            "item":"605449411d6e5b1185c9d2de",          
            "quantity": "20"
        }
    ]
}
```





## 🚀 Samples JSON Response
**Please provider auth-token (JWT) in Headers of Request**

- GET : Products in Warehouse
```json
{
    "data": [
        {
            "stock": 440,
            "_id": "607ac9aaad94b713fa366bdd",
            "product": null,
            "createdAt": "2021-04-17T11:42:34.295Z",
            "updatedAt": "2021-04-21T09:16:55.625Z",
            "__v": 0
        },
        {
            "stock": 0,
            "_id": "607f07863ca27f92d39fcf21",
            "product": {
                "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937677/gnzlpmsl2t1usc9ye2fj.png",
                "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937678/aqlydl4e6wdlx62ktszf.jpg",
                "_id": "607f074e3ca27f92d39fcf20",
                "filename": "imageUrl-1618937674747.jpg",
                "title": "Đừng Để Mất Bò - 7 Bước Quản Lý Cửa Hàng Hiệu Quả Và Chống Thất Thoát",
                "price": 149000,
                "description": "Bạn đang quản lý hay làm chủ một cửa hàng nhưng công việc kinh doanh lại không được suôn sẻ. Bạn luôn phải đau đầu vì những vấn đề như: \nTháng nào cũng có một lượng ngân quỹ “không cánh mà bay”.\nKhó tuyển người, nhân viên “đến rồi đi” mà không ai gắn bó.\nNhân viên đi làm trễ, vi phạm nội quy, nói hoài cũng không thay đổi.\n Hay dạy mãi nhưng nhân viên vẫn không làm được việc.\nĐừng đi tìm cách gỡ rối ở đâu xa xôi, quyển sách này sẽ giúp bạn giải quyết TẤT CẢ những vấn đề trên theo một cách khoa học và hiệu quả nhất. ",
                "author": "607962fd3b28280f84053110",
                "category": "6079636a3b28280f84053113",
                "provider": "607963393b28280f84053111",
                "publisher": "60795ce2773c2a0e524b52c5",
                "createdAt": "2021-04-20T16:54:39.002Z",
                "updatedAt": "2021-04-20T16:54:39.002Z",
                "__v": 0
            },
            "createdAt": "2021-04-20T16:55:34.119Z",
            "updatedAt": "2021-04-21T09:54:47.860Z",
            "__v": 0
        }
    ],
    "status": "SUCCESS"
}
```

- GET : Product in Cart
```json
{
    "status": "OK",
    "message": "Get Users Carts Successfully",
    "data": [
        {
            "_id": "60544b3b61d79712005f47de",
            "userId": "605048dbcafa1206c221d275",
            "items": [
                {
                    "item": {
                        "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937677/gnzlpmsl2t1usc9ye2fj.png",
                        "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937678/aqlydl4e6wdlx62ktszf.jpg",
                        "_id": "607f074e3ca27f92d39fcf20",
                        "filename": "imageUrl-1618937674747.jpg",
                        "title": "Đừng Để Mất Bò - 7 Bước Quản Lý Cửa Hàng Hiệu Quả Và Chống Thất Thoát",
                        "price": 149000,
                        "description": "Bạn đang quản lý hay làm chủ một cửa hàng nhưng công việc kinh doanh lại không được suôn sẻ. Bạn luôn phải đau đầu vì những vấn đề như: \nTháng nào cũng có một lượng ngân quỹ “không cánh mà bay”.\nKhó tuyển người, nhân viên “đến rồi đi” mà không ai gắn bó.\nNhân viên đi làm trễ, vi phạm nội quy, nói hoài cũng không thay đổi.\n Hay dạy mãi nhưng nhân viên vẫn không làm được việc.\nĐừng đi tìm cách gỡ rối ở đâu xa xôi, quyển sách này sẽ giúp bạn giải quyết TẤT CẢ những vấn đề trên theo một cách khoa học và hiệu quả nhất. ",
                        "author": "607962fd3b28280f84053110",
                        "category": "6079636a3b28280f84053113",
                        "provider": "607963393b28280f84053111",
                        "publisher": "60795ce2773c2a0e524b52c5",
                        "createdAt": "2021-04-20T16:54:39.002Z",
                        "updatedAt": "2021-04-20T16:54:39.002Z",
                        "__v": 0
                    },
                    "quantity": 20
                }
            ],
            "__v": 0
        }
    ]
}
```


- POST : Register
```json
{
    "status": "Success",
    "message": "Register account successfully",
    "data": {
        "phone": "",
        "address": "",
        "pushTokens": [],
        "_id": "607ff760cc5cc8870797ba78",
        "name": "Gia Vu",
        "email": "giavu@gmail.com",
        "password": "$2a$10$RmIeB9T6S0t2wEHGeA2zB.h/mfgeYUjJwWEYicyHiIr.2cDYm3W42",
        "profilePicture": "",
        "createdAt": "2021-04-21T09:58:56.687Z",
        "updatedAt": "2021-04-21T09:58:56.687Z",
        "__v": 0
    }
}
```



- POST : Login
```json
{
    "userid": "607ec5f6e3a5d0091ff78025",
    "name": "Vudang",
    "password": "$2a$10$3Ho6C5HO3ypPL4YWw.Tx5OzpvxjgaT/zNV8pHMpJUoGfDpHdAXG0e",
    "email": "admin@gmail.com",
    "phone": "",
    "address": "",
    "profilePicture": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDdlYzVmNmUzYTVkMDA5MWZmNzgwMjUiLCJpYXQiOjE2MTg5OTkwMjUsImV4cCI6MTYxOTYwMzgyNX0.uMerTNgPq3CtMoWc3oQb3Oz4tXDCa-mAUBvCB2IADWA",
    "loginAt": 1618999025039,
    "expireTime": 1619603825039
}
```



- GET : Orders by UserID
```json
{
    "status": "OK",
    "message": "Added Order Successfully",
    "data": {
        "_id": "607ff667cc5cc8870797ba77",
        "totalAmount": 5000,
        "userId": "607ec5f6e3a5d0091ff78025",
        "items": [
            {
                "item": "607f074e3ca27f92d39fcf20",
                "quantity": 10
            }
        ],
        "name": "Vudang",
        "address": "67 Huynh Thien Loc",
        "phone": "09667881234",
        "paymentMethod": "607fe47b4ebfda44935ff96b",
        "status": "607fe50d4ebfda44935ff971",
        "createdAt": "2021-04-21T09:54:47.780Z",
        "updatedAt": "2021-04-21T09:54:47.780Z",
        "__v": 0
    }
}
  
```


- GET : Favorite by UserID
``` json
{
    "status": "OK",
    "message": "Get Users Favorite List Successfully",
    "data": [
        {
            "_id": "607ff2794d7afe7bf95507ac",
            "userId": "607ec5f6e3a5d0091ff78025",
            "items": [
                {
                    "item": {
                        "url": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937677/gnzlpmsl2t1usc9ye2fj.png",
                        "thumb": "https://res.cloudinary.com/codingwithvudang/image/upload/v1618937678/aqlydl4e6wdlx62ktszf.jpg",
                        "_id": "607f074e3ca27f92d39fcf20",
                        "filename": "imageUrl-1618937674747.jpg",
                        "title": "Đừng Để Mất Bò - 7 Bước Quản Lý Cửa Hàng Hiệu Quả Và Chống Thất Thoát",
                        "price": 149000,
                        "description": "Bạn đang quản lý hay làm chủ một cửa hàng nhưng công việc kinh doanh lại không được suôn sẻ. Bạn luôn phải đau đầu vì những vấn đề như: \nTháng nào cũng có một lượng ngân quỹ “không cánh mà bay”.\nKhó tuyển người, nhân viên “đến rồi đi” mà không ai gắn bó.\nNhân viên đi làm trễ, vi phạm nội quy, nói hoài cũng không thay đổi.\n Hay dạy mãi nhưng nhân viên vẫn không làm được việc.\nĐừng đi tìm cách gỡ rối ở đâu xa xôi, quyển sách này sẽ giúp bạn giải quyết TẤT CẢ những vấn đề trên theo một cách khoa học và hiệu quả nhất. ",
                        "author": {
                            "_id": "607962fd3b28280f84053110",
                            "name": "Trần Thanh Phong ",
                            "createdAt": "2021-04-16T10:12:13.816Z",
                            "updatedAt": "2021-04-16T10:12:13.816Z",
                            "__v": 0
                        },
                        "category": {
                            "code": "KD ",
                            "_id": "6079636a3b28280f84053113",
                            "name": "Sách kinh doanh ",
                            "createdAt": "2021-04-16T10:14:02.823Z",
                            "updatedAt": "2021-04-16T10:14:02.823Z",
                            "__v": 0
                        },
                        "provider": {
                            "_id": "607963393b28280f84053111",
                            "name": "NXB Đà Nẵng ",
                            "createdAt": "2021-04-16T10:13:13.582Z",
                            "updatedAt": "2021-04-16T10:13:13.582Z",
                            "__v": 0
                        },
                        "publisher": {
                            "_id": "60795ce2773c2a0e524b52c5",
                            "name": "Alpha Book",
                            "createdAt": "2021-04-16T09:46:10.817Z",
                            "updatedAt": "2021-04-16T09:46:10.817Z",
                            "__v": 0
                        },
                        "createdAt": "2021-04-20T16:54:39.002Z",
                        "updatedAt": "2021-04-20T16:54:39.002Z",
                        "__v": 0
                    }
                }
            ],
            "createdAt": "2021-04-21T09:38:01.291Z",
            "updatedAt": "2021-04-21T09:38:01.291Z",
            "__v": 0
        }
    ]
}
```

## 🚀 Get Started

``` bash
# install dependencies
yarn install
```
``` bash
# run project
yarn start
```
``` bash
# Configuration 
Change the constants in .env file (your database, host, port,cloudinary key,stripe key ,...) 
Happy coding 😍😍😍
```

## 🚀 Server Features
- Login, Register, Forgot Password, ResetPassword with JWT Flow. 
- CRUD Products, Users, Carts, Whislist, Order...
- Fetch Products, Carts, Orders...
- Products url query (http://codingwithvudang-bookserver.herokuapp.com/api/v1/product?limit=2&page=1)
- Send email to user.
- Push notification to user's devices.
- Payment via Stripe
- Upload and resize photo 


## Technical details
- Nodejs, Express.
- Mongodb, Mongoose.
- Nodemailer.
- Multer, Sharp.
- Hapi/joi validation.
- Expo notification.
- Stripe Payment.
