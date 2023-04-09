const Customer = require('../models/Customer.model');

class CustomerController {
    //[GET] /customers/all
    all(req, res) {
        const customer = Customer.find()
            .then((customers) => {
                return res.json(customers);
            })
            .catch((error) => res.status(500).json({ error: error }));
    }

    //[POST] /customers/store
    store(req, res) {
        const customer = new Customer(req.body);

        customer.save().then((customer) => {
            return res.json({ message: 'Thêm dự án thành công', customer });
        });
    }
}

module.exports = new CustomerController();
