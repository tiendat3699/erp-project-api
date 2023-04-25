const Project = require('../models/Project.model');

class ProjectController {
    //[GET] /projects/all
    all(req, res) {
        const projects = Project.find()
            .populate({ path: 'customer', select: 'fullname -_id' })
            .populate({ path: 'users', select: 'fullname -_id' })
            .then((projects) => {
                return res.json(projects);
            })
            .catch((error) => res.status(500).json({ error: error }));
    }
    //[POST] /projects/store
    store(req, res) {
        const project = new Project(req.body);
        project.save().then((project) => {
            return res.json({ message: 'Thêm dự án thành công!', project });
        });
    }
}

module.exports = new ProjectController();
