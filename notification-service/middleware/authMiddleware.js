const axios = require('axios');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token' });
    }

    try {
        const response = await axios.get(`${process.env.USER_MICROSERVICE_URL}/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        req.user = response.data;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Not authorized, token failed' });
    }
};
