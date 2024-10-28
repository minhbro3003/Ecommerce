const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, confirmPassword, phone } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email);
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res
                .status(200)
                .json({ status: "ERR", message: "The input is required." });
        } else if (!isCheckEmail) {
            return res
                .status(200)
                .json({ status: "ERR", message: "The input is email." });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "The password is equal confirmpassword.",
            });
        }

        console.log("isCheckEmail", isCheckEmail);
        const user = await UserService.createUser(req.body);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "User creation failed",
            error: e.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password, confirmPassword, phone } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email);
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res
                .status(200)
                .json({ status: "ERR", message: "The input is required." });
        } else if (!isCheckEmail) {
            // check email
            return res
                .status(200)
                .json({ status: "ERR", message: "The input is email." });
        } else if (password !== confirmPassword) {
            //check password
            return res.status(200).json({
                status: "ERR",
                message: "The password is equal confirmpassword.",
            });
        }

        // console.log("isCheckEmail", isCheckEmail);
        const user = await UserService.loginUser(req.body);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "User creation failed",
            error: e.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }
        console.log("userId", userId);
        const user = await UserService.updateUser(userId, data);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed !",
            error: e.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // const token = req.headers;
        // console.log("token", token);
        // console.log("userId", userId);
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }
        const user = await UserService.deleteUser(userId);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed !",
            error: e.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await UserService.getAllUsers();
        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            error: e.message,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: "The userId is required",
            });
        }
        const user = await UserService.getDetailsUser(userId);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed 'SOS'!",
            error: e.message,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(" ")[1];

        if (!token) {
            return res.status(200).json({
                status: "ERR",
                message: "The token is required",
            });
        }
        const user = await JwtService.refreshTokenJwtService(token);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed 'SOS'!",
            error: e.message,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getDetailsUser,
    refreshToken,
};
