export enum CommonErrors {
    EmptyFields = "Please fill in all the fields",
    Unexpected = "Unexpected error occurred"
}

export enum AuthErrors {
    Username = "Username is required",
    UsernameTaken = "Username is already taken",
    Password = "Password is required",
    PasswordLength = "Password must be at least 6 characters long",
    PasswordsDontMatch = "Passwords don't match",
    InvalidPassword = "Invalid password. The password must contain at least one uppercase letter, special character, and be at least 6 characters long.",
    Email = "Email is required",
    EmailInvalid = "Email is invalid",
    EmptyFields = "Please fill in all the fields",
    IncorrectCredentials = "Incorrect username or password",
}

const Errors = {
    Common: CommonErrors,
    Auth: AuthErrors
}

export default Errors;