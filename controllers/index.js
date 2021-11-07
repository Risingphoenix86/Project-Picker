const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const dashboardRoutes = require('./dashboardRoutes');
const projectRoutes = require('./api/projectRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api/projectRoutes', projectRoutes);

module.exports = router;