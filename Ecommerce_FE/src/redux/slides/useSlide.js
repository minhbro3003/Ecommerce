import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    avartar: "",
    access_token: "",
    id: "",
    isAdmin: false,
};
export const useSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = "",
                email = "",
                access_token = "",
                phone = "",
                address = "",
                avartar = "",
                _id = "",
                isAdmin,
            } = action.payload;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avartar = avartar;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.avartar = "";
            state.id = "";
            state.access_token = "";
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = useSlide.actions;

export default useSlide.reducer;
