const mongoose = require('mongoose')
const Category = require('../../model/category.model')

module.exports.GetCategory = async (req, resp) => {
    const sexId = req.query.sexId
    const categories = await GetCategoryBySex(sexId)
    resp.send(categories)
}

const GetCategoryBySex = async sexId => {
    try {
        const categories = await Category.find({ 
            sex_id: mongoose.Types.ObjectId(sexId) 
        })
        return categories 
    } catch(err) {
        console.log(err)
    }
    return null
}