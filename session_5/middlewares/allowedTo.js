const appError = require("../utils/appError");

module.exports = (...roles) => {
    console.log("roles", roles);

    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create('You are not allowed to access this route', 401));
        }
        next();
    }
}