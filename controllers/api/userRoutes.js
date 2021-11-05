const router = require('express').Router();
const { User } = require('../../models');

//Create user
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
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

// login
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

//logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


//Delete User
router.delete('/user/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// MODIFY User
router.put("/user/:id", withAuth, (req, res) => {
    console.log(req.body, req.params.id)
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(affectedRows => {
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;