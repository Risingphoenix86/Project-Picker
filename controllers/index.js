const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/projects', projectRoutes);
module.exports = router;