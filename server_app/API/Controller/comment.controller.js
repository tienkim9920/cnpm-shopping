
const Comment = require('../../Models/comment')
const Users = require('../../Models/user')

module.exports.index = async (req, res) => {

    const id_product = req.params.id

    const comment_product = await Comment.find({ id_product: id_product })

    res.json(comment_product)

}

module.exports.post_comment = async (req, res) => {

    const id_product = req.params.id

    const user = await Users.findOne({ _id: req.body.id_user })

    let star1 = ''
    let star2 = ''
    let star3 = ''
    let star4 = ''
    let star5 = ''

    for (let i = 0; i < parseInt(req.body.star); i++){
        if (i = 0){
            star1 = 'fa fa-star'
        }
        if (i = 1){
            star2 = 'fa fa-star'
        }
        if (i = 2){
            star3 = 'fa fa-star'
        }
        if (i = 3){
            star4 = 'fa fa-star'
        }
        if (i = 4){
            star5 = 'fa fa-star'
        }
    }

    const data = {
        id_product: id_product,
        id_user: req.body.id_user,
        fullname: user.fullname,
        content: req.body.content,
        star1,
        star2,
        star3,
        star4,
        star5
    }

    await Comment.create(data)

    res.send('Thanh Cong')

}