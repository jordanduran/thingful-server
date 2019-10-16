const userService = {
    validatePassword(password) {
        if (password.length < 8) {
            return "Password must be greater than 8 characters"
        }
        if (password.length > 72) {
            return "Password must be less than 72 characters"
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return "No space before or after password"
        }
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&])[\S]+/
        //const REGEX_UPPER_LOWER_NUMBER_SPECIAL = new RegExp(/(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&])[\S]+/)
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
            
            return "Password must contain an uppercase letter, lowercase letter, a number, and a special character"
        }
        return null
    }
}

module.exports = userService;