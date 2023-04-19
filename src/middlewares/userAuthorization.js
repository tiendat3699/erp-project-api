const userAuthorization = (...Roles) => {
    return (req, res, next) => {
        if (Roles.includes(req.user.role)) {
            return next();
        } else {
            return res.status(401).json({
                error_code: 2,
                message: 'Không có quyền truy cập',
            });
        }
    };
};

module.exports = userAuthorization;
