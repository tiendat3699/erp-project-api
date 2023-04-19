const Customer = require('../models/Customer.model');

class CustomerController {
    //[GET] /customers/all
    all(req, res) {
        Customer.find()
            .lean()
            .select('-avatar')
            .then((customers) => {
                return res.json(customers);
            })
            .catch((error) => res.status(500).json({ error }));
    }

    //[POST] /customers/store
    store(req, res) {
        const customer = new Customer(req.body);
        customer
            .save()
            .then((customer) => {
                const { avatar, ...resData } = customer.toObject();
                return res.json({
                    message: 'Thêm khách hàng thành công',
                    customer: resData,
                });
            })
            .catch((error) => res.status(500).json({ error }));
    }

    //[PUT] /customers/:id
    update(req, res) {
        Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((updated) => res.json({ message: 'Cập nhật thành công!', updated }))
            .catch((error) => res.status(500).json({ error }));
    }

    //[DELETE] /customers/:id

    delete(req, res) {
        Customer.deleteById(req.params.id)
            .then((deletedItem) => res.json({ message: 'xóa thành công', deletedItem }))
            .catch((error) => res.status(500).json({ error }));
    }
}

module.exports = new CustomerController();
