const router = require('express').Router();
const doctor = require('../webservices/doctorsApi');


router.post('/register_doctor',doctor.register_doctor);
router.post('/fetch_doctors',doctor.fetch_doctors);
router.get('/test',doctor.test);


module.exports = router;