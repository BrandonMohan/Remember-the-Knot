const db = require('./db/models')

const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
    };
};

const logoutUser = async (req, res) => {
    await delete req.session.auth;
    res.redirect('/')
};


const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/');
    }
    return next();
};

const restoreUser = async (req, res, next) => {
    // Log the session object to the console
    // to assist with debugging.

    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await db.User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
};

module.exports = {
    loginUser,
    logoutUser,
    restoreUser,
    requireAuth
}
