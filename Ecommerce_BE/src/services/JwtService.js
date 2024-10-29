const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const genneralAccessToken = async (payload) => {
    // console.log("payload", payload);
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
    );
    return access_token;
};

const genneralFefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFESH_TOKEN,
        { expiresIn: "365d" }
    );
    return refresh_token;
};

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("token", token);
            jwt.verify(token, process.env.REFESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log("err", err);
                    resolve({
                        status: "ERR",
                        message: "The authentication",
                    });
                }
                console.log("user", user);
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });
                console.log("access_token", access_token);
                resolve({
                    status: "OK",
                    message: "User successfully",
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

//export const genneral
module.exports = {
    genneralAccessToken,
    genneralFefreshToken,
    refreshTokenJwtService,
};
