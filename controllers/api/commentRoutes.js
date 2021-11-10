const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth,  (req, res) => { 
    console.log(req.body);
     Comment.create({ ...req.body, user_id: req.session.user_id })
        .then(commentData => {
          res.json(commentData);
        })
        .catch(err => {
            console.log(err);
          res.status(500).json(err);
        });
});    

// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const commentData = await Comment.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });

//         if(!commentData) {
//             res.status(404).json({ message: 'No comment found with this ID.'});
//             return;
//         }

//         res.status(200).json(commentData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;