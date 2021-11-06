const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Project, User } = require('../models');

router.get('/', withAuth, async (req, res) => {
  res.render('dashboard', {
    logged_in: req.session.logged_in
  })
  .catch(err) 
    console.log(err);
    res.status(500).json(err);
})

router.get('/', withAuth, async (req, res) => {
    try {
      const projectData = await Project.findAll({
        where: {
          user_id: User.id
        },
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

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     const users = userData.map((user) => user.get({ plain: true }));

//     res.render('dashboard', {
//       ...users,
//       logged_in: req.session.logged_in
//     });
//   } catch(err) {
//       console.log(err);
//       res.status(500).json(err);
//   }
// });

module.exports = router;