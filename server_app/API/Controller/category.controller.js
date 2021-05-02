const Category = require('../../Models/category')

module.exports.index = async (req, res) => {

    const category = await Category.find()
    // console.log(category)

    res.json(category)

}