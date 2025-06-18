const mongoose = require('mongoose');

const getPagination = async (req, find, model) => {
    const pagination = {
        currentPage: 1,
        limitItems: 4
    };

    if (req.query.page) {
        pagination.currentPage = parseInt(req.query.page);
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

    const countProducts = await mongoose.model(model).countDocuments(find);
    const totalPage = Math.ceil(countProducts / pagination.limitItems);
    pagination.totalPage = totalPage;

    return pagination;
}
module.exports = getPagination;