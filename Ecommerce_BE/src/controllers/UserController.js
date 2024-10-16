const UserService = require("../services/UserService");

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await UserService.createUser();
        return res.status(200).json(user);
    } catch (e) {
        return (
            res.status(404),
            json({
                message: "User creation failed",
                error: e.message,
            })
        );
    }
};

module.exports = {
    createUser,
};
