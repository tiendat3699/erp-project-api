const Project = require('../models/Project');

class ProjectController {
    //[GET] /project/al
    all(req, res) {
        const projects = Project.find()
            .then((projects) => {
                return res.json(projects);
            })
            .catch((error) => res.status(500).json({ error: error }));
    }
    //[POST] /projects/store
    store(req, res) {
        const project = new Project({
            name: req.body.name,
            customerId: req.body.customerId,
            status: req.body.status,
            users: req.body.users,
        });

        project.save().then((project) => {
            return res.json({ message: 'Thêm dự án thành công', project });
        });
    }
}

module.exports = new ProjectController();
