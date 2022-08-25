const db = require('../configs/dbconfig');
const bycrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}
// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all fields" })
    }
    try {
        async function checkCorrectPassword(user) {
            return await bycrypt.compare(password, user.password)
        }
        db.searchByValue(
            {
                operation: "search_by_value",
                table: "user",
                searchAttribute: "email",
                searchValue: email,
                attributes: ["*"],
            }, async(err, response) => {
                if (err) {
                    throw new Error(err)
                }
                // check if password is correct
                if (response.data.length === 0) return res.status(400).json({ error: "user does not exist" })
                const user = response.data[0]
                const isPasswordCorrect = await bycrypt.compare(password, user.password)
                // const isPasswordCorrect = checkCorrectPassword(user)
                console.log({isPasswordCorrect})
                if (!isPasswordCorrect) {
                    return res.status(400).json({ error: "Incorrect password" })
                }
                const token = createToken(user.id)

                console.log(token)
                res.status(response.statusCode).json({ email: user.email, token: token });
            }

        );
        // console.log(await user)
        // if (!user) return res.status(400).json({ error: "user does not exist" })
        // const isPasswordCorrect = checkCorrectPassword(user)
        // if (!isPasswordCorrect) {
        //     throw new Error("Incorrect password")
        // }
        // const token = createToken(user.id)
        // res.status(200).json({ email: user.email, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// signup user

async function signupUser(req, res) {

    // check if user exists
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all fields" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid email" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Please enter a valid password" })
    }
    const user = await db.searchByValue({
        table: "user",
        searchAttribute: "email",
        searchValue: email,
        attributes: ["*"],
    })
    if (user.data.length > 0) return res.status(400).json({ error: "user already exists" })

    // hash password
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password, salt)

    // create user
    try {
        const user = await db.insert(
            {
                table: 'user',
                records: [
                    {
                        email: email,
                        password: hashedPassword
                    }
                ]
            }
        )
        db.searchByValue(
            {
                operation: "search_by_value",
                table: "user",
                searchAttribute: "id",
                searchValue: user.data.inserted_hashes[0],
                attributes: ["*"],
            }, (err, response) => {
                if (err) {
                    throw new Error(err)
                }
                console.log(response)
                const token = createToken(user.data.inserted_hashes[0])
                console.log(token)
                res.status(response.statusCode).json({ email: response.data[0].email, token: token });
            }
        );

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser
}