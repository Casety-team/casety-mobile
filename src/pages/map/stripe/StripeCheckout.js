import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-native-stripe-checkout-webview";

export default class StripeCheckouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripeID: "",
      publicKey:
        "pk_test_51I6xfpGWsM2bVeof75ZGYq7KXzLoNhta0xQFMtwbOZTz6sQKE2200cc7J8QoeGXkILPAve6Wl1zdLRL1TBFaGaQZ00k7zmJZhm",
    };
  }

  componentDidMount() {
    const { nameProduct, unitAmount } = this.props;
    axios
      .post(
        "https://api.casety.fr/stripe/charge/",
        {
          nameProduct: nameProduct,
          unitAmount: unitAmount,
          quantity: 1,
          reservationId: 1,
          idUser: 1, //change get Location
        },
        { timeout: 9000 }
      )
      .then((item) => {
        console.log("Stripe Success");
        this.setState({ stripeID: item.data.id });
        console.log("item => ", item.data);
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
        onSuccess={({ checkoutSessionId }) => {
          console.log(
            `Stripe checkout session succeeded. session id: ${checkoutSessionId}.`
          );
        }}
        onCancel={() => {
          console.log(`Stripe checkout session cancelled.`);
        }}
      />
    );
  }
}
