const express = require('express');
const router = express.Router();

const { createCountry, findCountryById, updateCountry, deleteCountry, getAllCountries } = require('../controllers/countryController');


router.post('/createcountry', createCountry)
router.get('/allcountries', getAllCountries )
router.get('/onecountry/:countryId', findCountryById)
router.put('/updatecountry/:countryId', updateCountry)
router.delete('/deletecountry/:countryId', deleteCountry)

module.exports = router;