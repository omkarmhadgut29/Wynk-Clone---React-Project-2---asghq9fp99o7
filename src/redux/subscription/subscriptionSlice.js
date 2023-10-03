import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSubscriptionPage: false,
    currentPlan: null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        setIsSubscriptionPage: (state, action) => {
            state.isSubscriptionPage = action.payload;
        },
        addSubscriptionPlan: (state, action) => {
            state.currentPlan = action.payload;
        },
    },
});

export const isSubscriptionPageSelector = createSelector(
    (state) => state.subscription.isSubscriptionPage,
    (state) => state
);

export const currentPlanSelector = createSelector(
    (state) => state.subscription.currentPlan,
    (state) => state
);

export const { setIsSubscriptionPage, addSubscriptionPlan } =
    subscriptionSlice.actions;

export default subscriptionSlice.reducer;
