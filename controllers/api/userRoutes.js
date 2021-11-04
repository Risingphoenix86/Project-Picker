const router = require('express').Router();
const { User } = require('../../models');

//Create user
router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: res.body.email
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
               .status(400)
               .json({ message: 'Incorrect email or password, please try again'});
            return; 
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
               .status(400)
               .json({ message: 'incorrect email or password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'you are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;