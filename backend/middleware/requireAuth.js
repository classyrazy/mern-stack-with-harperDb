const jwt = require('jsonwebtoken');
const db = require('../configs/dbconfig');

const requireAuth = async (req, res, next) => {
    // verify auth token

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized request' });
    }
    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        let test = null
        // db.searchByValue(
        //     {
        //         operation: "search_by_value",
        //         table: "user",
        //         searchAttribute: "id",
        //         searchValue: id,
        //         attributes: ["id"],
        //     }, (err, response) => {
        //         if (err) {
        //             return res.status(500).json(err);
        //         }

        //         req.user = response.data[0];
        //         test = response.data[0]
        //     }
        // );
        const Query = `SELECT id FROM ${process.env.INSTANCE_SCHEMA}.user WHERE id = "${id}"`
        const user = await db.query(Query)
        if (!user) {
            throw new Error('User not found');
        }
            req.user = user.data[0];
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized request' });
    }
}
module.exports = requireAuth;