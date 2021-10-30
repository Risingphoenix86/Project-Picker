const router = require('express').Router();

const apiRoutes = require('./apis');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/apis', apiRoutes);

module.exports = router;