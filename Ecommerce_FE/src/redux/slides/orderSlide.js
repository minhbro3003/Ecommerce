import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
};

export const orderSlide = createSlice({
    name: "order",
    initialState: {
        orderItems: [],
    },
    reducers: {
        addOrderProduct: (state, action) => {
            console.log({ state, action });
            const { orderItem } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem.product
            );
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            if (itemOrder) {
                itemOrder.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(
                (item) => item.product !== idProduct
            );
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => !listChecked.includes(item.product)
            );
            state.orderItems = itemOrder;
        },
    },
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
} = orderSlide.actions;

export default orderSlide.reducer;
