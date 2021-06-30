import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-native-stripe-checkout-webview";
import deviceStorage from "../../../services/deviceStorage";
import moment from "moment";
import "moment/locale/fr";

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
    const { idReserver, idLocker, userId, nameProduct, depot, retrait } =
      this.props;
    this.setState({ reserverId: idReserver });
    this.setState({ lockerId: idLocker });

    //Get id user in local storage
    deviceStorage
      .getMyObject()
      .then(async (item) => await this.setState({ userId: item.id }));
    const startDate = moment(depot);
    const timeEnd = moment(retrait);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    const hours = diffDuration.hours();
    const days = diffDuration.days();

    var count = 0;
    if (days) {
      for (var i = 0; i < days; i++) {
        count += 24;
      }
    }
    const r = hours + count;
    const result = r + "00";

    axios
      .post("https://api.casety.fr/stripe/charge/", {
        nameProduct: nameProduct,
        unitAmount: result,
        quantity: 1,
        userId: userId,
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
