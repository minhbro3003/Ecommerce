const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralFefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "The email is already",
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            console.log("hash:", hash);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                // confirmPassword: hash,
                phone,
            });
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "Success",
                    data: createUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            console.log("comparePassword: ", comparePassword);

            // const createdUser = await User.create({
            //     name,
            //     email,
            //     password: hash,
            //     // confirmPassword: hash,
            //     phone,
            // });
            // if (createdUser) {
            if (!comparePassword) {
                resolve({
                    status: "OK",
                    message: "The password or user is incorrect",
                });
            }

            //access token
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            // refresh token
            const refresh_token = await genneralFefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            // console.log("access_token: ", access_token);
            resolve({
                status: "OK",
                message: "Success",
                access_token,
                refresh_token,
            });
            // }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id }); //_id
            console.log("checkUser: ", checkUser);
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "Success",
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id }); //_id
            console.log("checkUser: ", checkUser);
            if (checkUser === null) {
                resolve({
                    status: "Error",
                    message: "The user is not defined",
                });
            }

            await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete user successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: "OK",
                message: " All users successfully",
                data: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id }); //_id
            if (user === null) {
                resolve({
                    status: "Error",
                    message: "The user is not defined",
                });
            }

            resolve({
                status: "OK",
                message: "User successfully",
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getDetailsUser,
};
