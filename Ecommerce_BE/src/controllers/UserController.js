const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password, confirmPassword } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email);
        if (!email || !password || !confirmPassword) {
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
        const { email, password } = req.body;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = mailformat.test(email);

        if (!email || !password) {
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is required." });
        } else if (!isCheckEmail) {
            // check email
            return res
                .status(400)
                .json({ status: "ERR", message: "The input is email." });
        }

        // console.log("isCheckEmail", isCheckEmail);
        const user = await UserService.loginUser(req.body);
        const { refresh_token, ...newUser } = user;
        // console.log("user", user);
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: "strict",
        });
        return res.status(200).json(newUser);
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
    console.log("req.cookies.refresh_token: ", req.cookies.refresh_token);
    try {
        const token = req.cookies.refresh_token;

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

const logoutUser = async (req, res) => {
    try {
        res.clearCookie(`refresh_token`);
        return res.status(200).json({
            status: "OK",
            message: "Logout successfully",
        });
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
    logoutUser,
};
