const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req,res) => {
    const body = req.body;
    console.log(req.session.userId);
    Project.create({ 
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.userId
    })
    .then(newProject => {
        res.json(newProject);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Project.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProjectData => {
        if(!dbProjectData) {
            res.status(404).json({message: 'No project found with that ID'});
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req,res) => {
    console.log(req.body, req.params.id)
})

module.exports = router;