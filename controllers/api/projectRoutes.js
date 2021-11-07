const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');

<<<<<<< HEAD
router.get('/', async (req, res) => {
    try {
      const projectData = await Project.findAll({
          include: {
              model: User,
              attributes: ['username'],
          }
      });
=======
>>>>>>> ad623cd851df907a96d7014e79b8ae0711050a28


<<<<<<< HEAD
      res.render('project', {
        ...projects,
        logged_in: req.session.logged_in
      });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
=======

>>>>>>> ad623cd851df907a96d7014e79b8ae0711050a28

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

router.put('/:id', withAuth, (req,res) => {
    console.log(req.body, req.params.id)
})

module.exports = router;