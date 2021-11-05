const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Project, User } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try {
      const projectData = await Project.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const projects = projectData.map((project) => project.get({ plain: true }));

      res.render('dashboard', {
        ...projects,
        logged_in: req.session.logged_in
      });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;