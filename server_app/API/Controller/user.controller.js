const Users = require('../../Models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.index = async (req, res) => {

    const user = await Users.find()

    res.json(user)

}

module.exports.user = async (req, res) => {

    const id = req.params.id

    const user = await Users.findOne({ _id: id })

    res.json(user)

}

module.exports.detail = async (req, res) => {

    const username = req.query.username

    const password = req.query.password

    const query = [{ username: username }, { email: username }]

    const user = await Users.findOne({ $or: query })

    if (user === null) {
        res.send("Khong Tìm Thấy User")
    } else {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            res.json(user)
        } else {
            res.json("Sai Mat Khau")
        }
    }

}

module.exports.post_user = async (req, res) => {

    const user = await Users.findOne({ username: req.body.username })

    if (user) {
        res.send("User Da Ton Tai")
    } else {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await Users.create(req.body)
    }

    res.send("Thanh Cong")

}