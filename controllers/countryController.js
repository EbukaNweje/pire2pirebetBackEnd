const Country = require('../models/countryModel');

// Create Operation
exports.createCountry = async (req, res) => {
    try {
        const { countryName } = req.body;
        const newCountry = new Country({ countryName });
        const savedCountry = await newCountry.save();
        console.log("Country saved:", savedCountry);
        res.status(200).json({
            message: 'Country successfully created',
            data: savedCountry
        });
    } catch (error) {
        console.error("Error saving country:", error);
        res.status(500).json({
            message: error.message
        });
    }
};


const axios = require('axios');

// Function to fetch data about all countries
exports.getAllCountries = async (req, res) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        const countryNames = countries.map(country => country.name.common);
        countryNames.sort((a, b) => a.localeCompare(b));

        if(!countryNames){
            return res.status(404).json({
                message: `Not found`
            })
        }

        res.status(200).json({
            message:`Countries found`,
            data: countryNames
        })
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error;
    }
};

// Read Operation
exports.findCountryById = async (req, res) => {
    const { countryId } = req.params;
    try {
        const country = await Country.findById(countryId).populate('leagues');
        if (country) {
            console.log("Found country:", country);
            res.status(200).json({
                message: 'Country found',
                data: country
            });
        } else {
            console.log("Country not found");
            res.status(404).json({
                message: 'Country not found'
            });
        }
    } catch (error) {
        console.error("Error finding country:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// exports.getAllCountries = async (req, res) => {
//     try {
//         const countries = await Country.find().populate('leagues');
//         console.log("All countries:", countries);
//         res.status(200).json({
//             message: 'All countries found',
//             data: countries
//         });
//     } catch (error) {
//         console.error("Error finding countries:", error);
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

// Update Operation
exports.updateCountry = async (req, res) => {
    const { countryId } = req.params;
    const newData = req.body;
    try {
        const updatedCountry = await Country.findByIdAndUpdate(countryId, newData, { new: true });
        console.log("Updated country:", updatedCountry);
        res.status(200).json({
            message: 'Country successfully updated',
            data: updatedCountry
        });
    } catch (error) {
        console.error("Error updating country:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Operation
exports.deleteCountry = async (req, res) => {
    try {
        const { countryId } = req.params;

        const deletedCountry = await Country.findByIdAndDelete(countryId);
        console.log("Deleted country:", deletedCountry);
        res.status(200).json({
            message: 'Country successfully deleted',
            data: deletedCountry
        });
    } catch (error) {
        console.error("Error deleting country:", error);
        res.status(500).json({
            message: error.message
        });
    }
};


exports.findOneCountry = async (req, res) =>{
    try{
        const {userId} = req.userId;

        const user = await Country.findById(userId)
        if(!user){
            return res.status(404).json({
                message: `This user cannot be found`
            })
        }



    }catch(error){
        res.status(500).json({
            message: `Internal server error: ${error.message}`
        })
    }
}
