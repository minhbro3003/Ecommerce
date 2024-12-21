import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    orderItemsSlected: [],
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
    isSucessOrder: false,
};

export const orderSlide = createSlice({
    name: "order",
    initialState,
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
            const itemOrderSelected = state?.orderItemsSlected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            const itemOrderSelected = state?.orderItemsSlected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount--;
            // itemOrderSelected.amount--;
            if (itemOrderSelected && itemOrderSelected.amount > 1) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(
                (item) => item.product !== idProduct
            );
            state.orderItemsSlected = state.orderItemsSlected.filter(
                (item) => item.product !== idProduct
            );
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            const itemOrder = state?.orderItems?.filter(
                (item) => !listChecked.includes(item.product)
            );
            const itemOrderSelected = state?.orderItemsSlected?.filter(
                (item) => !listChecked.includes(item.product)
            );
            state.orderItems = itemOrder;
            state.orderItemsSlected = itemOrderSelected;
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            const orderSelected = [];
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order);
                }
            });
            state.orderItemsSlected = orderSelected;
            console.log("selected: ", state, action);
        },
    },
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    removeAllOrderProduct,
    selectedOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
