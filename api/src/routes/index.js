const { Router } = require('express');
const DogRouter = require('./dog');
const TemperamentRouter = require('./temperament');


const router = Router();

router.use('/dogs', DogRouter);
router.use('/temperament', TemperamentRouter);




module.exports = router;
