const Joi = require("@hapi/joi");

const validationSignUp = (req, res, next) => {
    const validMonths = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
        'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    // Define the validation schema using Joi
    const schema = Joi.object({
        fullName: Joi.string()
            .pattern(/^\s*[A-Za-z]+(?:\s+[A-Za-z]+)*\s*$/)
            .required()
            .messages({
                "any.required": "Please provide your Fullname name.",
                "string.empty": "Fullname name cannot be left empty.",
                "string.pattern.base": "Fullname name should only contain letters with spaces allowed in between.",
            }),
        userName: Joi.string()
            .pattern(/^\s*[A-Za-z]+\s*$/)
            .required()
            .messages({
                "any.required": "Please provide your username.",
                "string.empty": "Username cannot be left empty.",
                "string.pattern.base": "Username should only contain letters.",
            }),
        // lastName: Joi.string()
        //     .pattern(/^\s*[A-Za-z]+\s*$/)
        //     // .required()
        //     .messages({
        //         // "any.required": "Please provide your last name.",
        //         "string.empty": "Last name cannot be left empty.",
        //         "string.pattern.base": "Last name should only contain letters.",
        //     }),
        fanClub: Joi.string()
            .pattern(/^\s*[A-Za-z]+(?:\s+[A-Za-z]+)*\s*$/)
            .required()
            .messages({
                "any.required": "Please provide your Fan Club name.",
                "string.empty": "Fan Club name cannot be left empty.",
                "string.pattern.base": "Fan Club name should only contain letters with spaces allowed in between.",
            }),
        email: Joi.string().email().required().messages({
            "any.required": "Please provide your email address.",
            "string.empty": "Email address cannot be left empty.",
            "string.email": "Invalid email format. Please use a valid email address.",
        }),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,}$"))
            .required()
            .messages({
                "any.required": "Please provide a password.",
                "string.empty": "Password cannot be left empty.",
                "string.pattern.base":
                    "Password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
        // confirmPassword: Joi.string()
        //     .valid(Joi.ref("password"))
        //     .required()
        //     .messages({
        //         "any.only": "Passwords do not match. Please make sure your passwords match.",
        //         "string.empty": "Please confirm your password.",
        //         "any.required": "Please confirm your password.",
        //     }),
        // birthday: Joi.object({
        //     day: Joi.number().integer().min(1).max(31).required(),
        //     month: Joi.string().valid(...validMonths).required().uppercase(),
        //     year: Joi.number().integer().min(1000).max(9999).required(),
        // }).custom((value, helpers) => {
        //     // Custom validation for February
        //     if (value.month === 'FEBRUARY' && (value.day < 1 || value.day > 29)) {
        //         return helpers.error('any.custom', { message: 'Invalid day for February.' });
        //     }
        //     return value;
        // }).required(),
        // deposit: Joi.number().default(0),
        // withdraw: Joi.number().default(0),
        // bitcoinAddress: Joi.string(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(" ");
        return res.status(400).json({ message: errorMessage });
    }

    next();
};


const validationUpdate = (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
        firstName: Joi.string()
            .pattern(/^\s*[A-Za-z]+\s*$/)
            .messages({
                "string.empty": "First name cannot be left empty.",
                "string.pattern.base": "First name should only contain letters.",
            }),
        lastName: Joi.string()
            .pattern(/^\s*[A-Za-z]+\s*$/)
            .messages({
                "string.empty": "Last name cannot be left empty.",
                "string.pattern.base": "Last name should only contain letters.",
            }),
        email: Joi.string().email().messages({
            "string.empty": "Email address cannot be left empty.",
            "string.email": "Invalid email format. Please use a valid email address.",
        }),
        bitcoinAddress: Joi.string()
            .trim()
            .messages({
                "string.empty": "Bitcoin Address cannot be left empty."
            }),
        newPassword: Joi.string()
            .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,}$"))
            .messages({
                "string.empty": "New password cannot be left empty.",
                "string.pattern.base":
                    "New password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    // If there's a validation error, return a response with the error details
    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(" ");
        return res.status(400).json({ message: errorMessage });
    }

    // If validation is successful, move to the next middleware
    next();
};



const validationPassword = (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
        newPassword: Joi.string()
            .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,}$"))
            .required()
            .messages({
                "any.required": "Please provide new password.",
                "string.empty": "New password cannot be left empty.",
                "string.pattern.base":
                    "New password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
        existingPassword: Joi.string()
            .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,}$"))
            .required()
            .messages({
                "any.required": "Please provide Existing password.",
                "string.empty": "Existing password cannot be left empty.",
                "string.pattern.base":
                    "Existing password must be at least 7 characters long and include at least one uppercase letter and one special character (!@#$%^&*).",
            }),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    // If there's a validation error, return a response with the error details
    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(" ");
        return res.status(400).json({ message: errorMessage });
    }

    // If validation is successful, move to the next middleware
    next();
};






module.exports = {
    validationSignUp,
    validationUpdate,
    validationPassword,
}