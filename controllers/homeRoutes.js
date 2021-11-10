const router = require('express').Router();
const { User, Project, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['username', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true}));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in    
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signup');
});

router.get('/projects', async (req, res) => {
    try {
      const projectData = await Project.findAll({ 
      });

      const projects = projectData.map((project) => project.get({ plain: true }));
      console.log(projects);
      res.render('project', {
        projects: projects,
        logged_in: req.session.logged_in
      });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/projects/:id", (req, res) => {
  Project.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
  .then((dbProjectData) => {
    if (dbProjectData) {
      const project = dbProjectData.get({ plain: true });
      res.render("project-details", { project });
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});


// router.get('/projects/:id', async (req, res) => {
//     try {
//       const projectData = await Project.findByPk(req.params.id, {
//         include: [
//           {
//             model: User,
//             attributes: ['username'],
//           },
//           {
//             model: Comment,
//             include: [ User ],
//           }
//         ],
//       });
//     const project = projectData.get({ plain: true });
    
//     res.render('project-details', {
//       project,
//       logged_in: req.session.logged_in
//     });
//   } catch(err) {
//       console.log(err);
//       res.status(500).json(err);
//   }
// });


module.exports = router;