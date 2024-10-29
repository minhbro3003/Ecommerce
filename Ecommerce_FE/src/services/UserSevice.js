import axios from "axios";

export const loginUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
        data
    );
    return res.data;
};
// export const loginUser = async (data) => {
//     try {
//         const res = await axios.post(
//             `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
//             data
//         );
//         return res.data;
//     } catch (error) {
//         console.error("Login Error:", error.response?.data || error.message);
//         return {
//             status: "ERR",
//             message:
//                 error.response?.data?.message ||
//                 "Failed to login due to network error",
//         };
//     }
// };

export const signUpUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
        data
    );
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`,
        {
            headers: {
                token: `Bearer: ${access_token}`,
            },
        }
    );
    return res.data;
};
