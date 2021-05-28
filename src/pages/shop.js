import React from "react";
import StripeCheckouts from "../components/map/stripe/StripeCheckout";
const Shop = ({ route, navigation }) => {
  const { idReserver, idLocker, name, price } = route.params;

  const fullName = "Casier de " + name;
  const total = parseInt(JSON.stringify(price).substring(0, 2) + "00");

  return (
    <StripeCheckouts
      idLocker={idLocker}
      idReserver={idReserver}
      nameProduct={fullName}
      unitAmount={total}
      navigation={navigation}
    />
  );
};

export default Shop;
