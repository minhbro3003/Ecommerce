import axios from "axios";
import { axiosJWT } from "./UserSevice";

export const createOrder = async (data, access_token) => {
    console.log("access_token: ", access_token, data);
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/create-payment`,
        data,
        {
            headers: {
                token: `Bearer: ${access_token}`,
            },
        }
    );
    return res.data;
};
