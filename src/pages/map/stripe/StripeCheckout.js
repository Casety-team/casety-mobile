import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-native-stripe-checkout-webview";
import deviceStorage from "../../../services/deviceStorage";

export default class StripeCheckouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripeID: "",
      userId: "",
      reserverId: "",
      lockerId: "",
      publicKey:
        "pk_test_51I6xfpGWsM2bVeof75ZGYq7KXzLoNhta0xQFMtwbOZTz6sQKE2200cc7J8QoeGXkILPAve6Wl1zdLRL1TBFaGaQZ00k7zmJZhm",
    };
  }

  componentDidMount() {
    const { idReserver, idLocker, nameProduct, unitAmount } = this.props;
    this.setState({ reserverId: idReserver });
    this.setState({ lockerId: idLocker });

    //Get id user in local storage
    deviceStorage
      .getMyObject()
      .then(async (item) => await this.setState({ userId: item.id }));

    axios
      .post("https://api.casety.fr/stripe/charge/", {
        nameProduct: nameProduct,
        unitAmount: unitAmount,
        quantity: 1,
        userId: this.state.userId,
        reservationId: idReserver,
      })
      .then((item) => {
        console.log("Stripe Success");
        this.setState({ stripeID: item.data.id });
      })
      .catch(function (error) {
        if (!error.status) {
          console.log("Stripe fail :", error);
        }
      });
  }

  render() {
    return (
      <StripeCheckout
        stripePublicKey={this.state.publicKey}
        checkoutSessionInput={{
          sessionId: this.state.stripeID,
        }}
        onSuccess={() => {
          console.log(
            `Stripe checkout session succeeded. ${this.state.reserverId}.`
          );
          this.props.navigation.navigate("Genere", {
            lockerId: this.state.lockerId,
            reserverId: this.state.reserverId,
          });
        }}
        onCancel={() => {
          console.log(`Stripe checkout session cancelled.`);
        }}
      />
    );
  }
}
