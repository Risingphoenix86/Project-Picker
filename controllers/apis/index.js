const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);


module.exports = router;