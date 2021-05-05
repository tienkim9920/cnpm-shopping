const Permission = require('../../../Models/permission')

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Permission.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const permission = await Permission.find();


    if (!keyWordSearch) {
        res.json({
            permission: permission.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = permission.filter(value => {
            return value.permission.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.id.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            permission: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}

module.exports.all = async (req, res) => {

    const permission = await Permission.find()

    res.json(permission)

}

module.exports.create = async (req, res) => {
    const permission = await Permission.find();

    const permissionFilter = permission.filter((c) => {
        return c.permission.toUpperCase() === req.query.name.toUpperCase().trim()
    });

    if (permissionFilter.length > 0) {
        res.json({ msg: 'Quyền đã tồn tại' })
    } else {
        var newPermission = new Permission()
        req.query.name = req.query.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
        newPermission.permission = req.query.name

        newPermission.save();
        res.json({ msg: "Bạn đã thêm thành công" })
    }
}

module.exports.delete = async (req, res) => {
    console.log(req.query)
    const id = req.query.id;

    await Permission.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: err })
            return;
        }
        res.json({ msg: "Thanh Cong" })
    })

}

module.exports.details = async (req, res) => {
    const permission = await Permission.findOne({ _id: req.params.id });

    res.json(permission)
}

module.exports.update = async (req, res) => {
    const permission = await Permission.find();

    const permissionFilter = permission.filter((c) => {
        return c.permission.toUpperCase() === req.query.name.toUpperCase().trim() && c.id !== req.query.id
    });

    if (permissionFilter.length > 0) {
        res.json({ msg: 'Quyền đã tồn tại' })
    } else {
        req.query.name = req.query.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
        await Permission.updateOne({ _id: req.query.id }, { permission: req.query.name }, function (err, res) {
            if (err) return res.json({ msg: err });
        });
        res.json({ msg: "Bạn đã update thành công" })
    }
}