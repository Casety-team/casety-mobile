import React from "react";
import StripeCheckouts from "../components/map/stripe/StripeCheckout";
const Shop = ({ route, navigation }) => {
  const { idReserver, idLocker, userId, name, depot, retrait } = route.params;

  return (
    <StripeCheckouts
      idLocker={idLocker}
      idReserver={idReserver}
      userId={userId}
      nameProduct={name}
      depot={depot}
      retrait={retrait}
      navigation={navigation}
    />
  );
};

export default Shop;
