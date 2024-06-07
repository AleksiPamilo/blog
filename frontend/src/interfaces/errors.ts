export enum CommonErrors {
    EmptyFields = "Please fill in all the fields.",
    EmptyComment = "Comment cannot be empty.",
    Unexpected = "Unexpected error occurred.",
    ShortContent = "Content needs expansion.",
    LongContent = "Content needs trimming.",
    InternalServerError = "Internal Server Error.",
    ValuesDontMatch = "Values do not match.",
}

export enum AuthErrors {
    Username = "Username is required.",
    UsernameTaken = "Username is already taken.",
    Password = "Password is required.",
    PasswordLength = "Password must be at least 6 characters long.",
    PasswordsDontMatch = "Passwords don't match.",
    InvalidPassword = "Invalid password. The password must contain at least one uppercase letter, special character, and be at least 6 characters long.",
    Email = "Email is required.",
    EmailInvalid = "Email is invalid.",
    VerifyEmail = "To continue, please verify your email address.",
    EmptyFields = "Please fill in all the fields.",
    IncorrectCredentials = "Incorrect username or password.",
    Unauthorized = "To continue, please log in or create an account.",
}

const Errors = {
    Common: CommonErrors,
    Auth: AuthErrors
}

export default Errors;