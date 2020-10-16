require('dotenv').config();

const DB_PASS = process.env.DB_PASS;
const JWT_SECRET = process.env.JWT_SECRET;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const AZURE_STORAGE_KEY = process.env.AZURE_STORAGE_KEY;
const TOKEN_HEADER = 'Authorization';
const USER_TYPES = {
    PATIENT: 'patient', //puser
    DOCTOR: 'doctor', //duser
    INSURANCEPROVIDER: 'insurance', //ipuser
};

// Regex Functions
// Test at regex101.com
const regexLettersOnly = new RegExp(`^[a-zA-Z]{2,}$`);
const regexPhoneNumber = new RegExp(`^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$`);
const heightRegex = new RegExp(`^[3-7] (?:\s*(?:1[01]|[0-9])(''|"))?$`); // Example 5 8"

function UserTypeToTableName(userType){
    if(userType === USER_TYPES.PATIENT) return "patientUsers";
    else if(userType === USER_TYPES.DOCTOR) return "doctorUsers";
    else if(userType === USER_TYPES.INSURANCEPROVIDER) return "insuranceUsers";
    else return "ERROR";
}

function CleanErrorMessage(result) {
    if (result.error)
        result.error.message = result.error.message.replace(/\"/g, '');
    return result;
}

module.exports = {
    DB_PASS, JWT_SECRET, TOKEN_HEADER, GMAIL_PASSWORD, AZURE_STORAGE_KEY, USER_TYPES, regexLettersOnly, regexPhoneNumber, heightRegex,
    UserTypeToTableName, CleanErrorMessage
};