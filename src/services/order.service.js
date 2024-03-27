const Order = require('../model/order.model');

module.exports = class orderServices {
    async addToOrder(body) {
        try {
            return await Order.create(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while adding order" });
        }
    };

    async getOrder(body) {
        try {
            return await Order.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while getting order" });
        }
    };

    async getOrderById(id) {
        try {
            let results = await Order.findById(id);
            console.log(results);
            return results
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while getting order by ID" });
        }
    };

    async getAllOrder(body) {
        try {
            return await Order.find(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while getting all order" });
        }
    };

    async updateOrder(id, body) {
        try {
            let results = await Order.findByIdAndUpdate(id, { $set: body }, { new: true });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while updating order" });
        }
    };
};