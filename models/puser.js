const Joi = require('joi');
const constants = require('../utils/constants');
// id int NOT NULL,
// PRIMARY KEY (id),
// address1 varchar(255) NULL,
// address2 varchar(255) NULL,
// city varchar(50) NULL,
// state1 varchar(15) NULL,
// zipcode varchar(15) NULL,
// birthdate varchar(15) NULL,
// sex varchar(10) NULL,
// height varchar(10) NULL,
// weight1 varchar(10) NULL,
// bloodtype varchar(5) NULL,
// smoke BIT NULL,
// smokefreq int NULL,
// drink BIT NULL,
// drinkfreq int NULL,
// caffeine BIT NULL,
// caffeinefreq int NULL

function ValidatePatientMedicalData(request) {
    const schema = Joi.object({
        id: Joi.number  (),
        address1: Joi.string().required(),
        address2: Joi.string().allow('', null),
        city: Joi.string().required(),
        state1: Joi.string().valid('AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
        'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR',
        'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY').required().error(()=>new Error('State abbreviation was invalid.')),
        zipcode: Joi.string().min(5).max(5).required(),
        birthdate: Joi.date().max('now').min('1-1-1900').required(),
        sex: Joi.string().valid('Male', 'Female').required().error(()=>new Error('Gender is invalid.')),
        height: Joi.string().regex(constants.heightRegex).required().error(()=>new Error('Height format is invalid.')),
        weight1: Joi.required(),
        bloodtype: Joi.string().valid('O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'Unknown').required().error(()=>new Error('Blood type is invalid.')),
        smoke: Joi.boolean().required(),
        smokefreq: Joi.number().allow(null),
        drink: Joi.boolean().required(),
        drinkfreq: Joi.number().allow(null),
        caffeine: Joi.boolean().required(),
        caffeinefreq: Joi.number().allow(null),
    });

    return constants.CleanErrorMessage(schema.validate(request));
}

module.exports.ValidatePatientMedicalData = ValidatePatientMedicalData;