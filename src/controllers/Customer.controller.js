const Customer = require('../models/Customer.model');
const File = require('../models/File.model');

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
        File.findOne({ _id: req.body.avatar }).then((item) => {
            res.contentType(item.file.contentType);
            res.send(item.file.data);
        });
        // const customer = new Customer(req.body);
        // customer.save().then((customer) => {
        //     return res.json({ message: 'Thêm khách hành thành công', customer });
        // });
    }
}

module.exports = new CustomerController();
