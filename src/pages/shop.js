import React from "react";
import StripeCheckouts from "../pages/map/stripe/StripeCheckout";
const Shop = ({ route, navigation }) => {
  const { name, price } = route.params;

  const fullName = "Casier de " + name;
  const total = parseInt(JSON.stringify(price).substring(0, 2) + "00");

  return <StripeCheckouts nameProduct={fullName} unitAmount={total} />;
};

export default Shop;
