import React from "react";
import { Route, Routes } from "react-router-dom";
import GroceriesProducts from "./GroceriesProducts";
import { Home } from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ProductDetailPage } from "./ProductDetailPage";
import { Women } from "./Women";
import Account from "./Account";
import CartPage from "./CartPage";
import OrderSummaryPage from "./OrderSummaryPage";
import PaymentPage from "./PaymentPage";
import OrderConfirmedPage from "./OrderConfirmedPage";

import FruitsProducts from "./FruitsProducts";

// import MobileTablet from "../Components/Electronics/MobileTablet";
import MobileProducts from "./MobileProducts";


export const MainPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groceriesproducts" element={<GroceriesProducts />} />
        <Route path="/fashion/women" element={<Women />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderSummaryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orderplaced" element={<OrderConfirmedPage />} />
        <Route path="/fashion/women/:id" element={<ProductDetailPage />} />

      
        <Route path="/mobileProducts" element={<MobileProducts />} />

        <Route path="/:section/:id" element={<ProductDetailPage />} />

        <Route path="/fruitsproducts" element={<FruitsProducts />} />


      </Routes>
    </div>
  );
};
