import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductsSlice from './admin/product-slice' 
import AdminOrderSlice from './admin/order-slice' 
import shoppingProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"
import shopAddressSlice from "./shop/address-slice"
import shopOrderSlice from "./shop/order-slice"
import shopSearchSlice from "./shop/search-slice"
import shopReviewSlice from "./shop/review-slice"
import commonFeatureSlice from "./common-slice"

const store = configureStore({
  reducer : {
    auth : authReducer,
    AdminProducts : AdminProductsSlice,
    shopProducts : shoppingProductSlice,
    shopCart : shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder : shopOrderSlice,
    adminOrder : AdminOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview : shopReviewSlice,
    commonFeature: commonFeatureSlice
  }
});

export default store;