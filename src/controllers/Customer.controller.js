const Customer = require('../models/Customer.model');
const File = require('../models/File.model');

class CustomerController {
    //[GET] /customers/all
    all(req, res) {
        const customer = Customer.find()
            .select('-avatar')
            .then((customers) => {
                return res.json(customers);
            })
            .catch((error) => res.status(500).json({ error: error }));
    }

    //[POST] /customers/store
    store(req, res) {
        const customer = new Customer(req.body);
        customer.avatar_url = req.body.fileUrl;
        customer
            .save()
            .then((customer) => {
                const { avatar, ...resData } = customer;
                return res.json({
                    message: 'Thêm khách hàng thành công',
                    customer: resData,
                });
            })
            .catch((error) => res.status(500).json({ error: error }));
    }

    //[PUT] /customers/edit
    edit(req, res) {}
}

module.exports = new CustomerController();
