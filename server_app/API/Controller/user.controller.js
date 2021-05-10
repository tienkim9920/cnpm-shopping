const Users = require('../../Models/user')


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
        if (user.password === password) {
            res.json(user)
        } else {
            res.send("Sai Mat Khau")
        }
    }

}

module.exports.post_user = async (req, res) => {

    const user = await Users.findOne({ username: req.body.username })

    if (user) {
        res.send("User Da Ton Tai")
    } else {
        await Users.create(req.body)
    }

    res.send("Thanh Cong")

}

module.exports.update_user = async (req, res) => {

    const user = await Users.findOne({ _id: req.body._id})

    user.fullname = req.body.fullname
    user.username = req.body.username
    user.password = req.body.password

    user.save()

    res.json("Thanh Cong")

}