import { URL_API } from "@env";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../../actions/isLoadingToken";
import deviceStorage from "../../../services/deviceStorage";
import { View, Text } from "react-native";
import axios from "axios";
import { SvgXml } from "react-native-svg";

import SecondPage from "./SecondPage";
import FirstPage from "./FirstPage";
import { Styles } from "./register.modules";

import ellipseClear from "../pictures/ellipse-clear.svg";
import ellipseComplet from "../pictures/ellipse-complet.svg";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ellipseActive, setEllipseActive] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [isSelection, setSelection] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelection == true) {
      if (
        email != "" &&
        password != "" &&
        first != "" &&
        last != "" &&
        phone != "" &&
        city != "" &&
        adress != "" &&
        codePostal != ""
      ) {
        handleRegister();
      } else {
        alert("Vous n'avez pas remplies tous les champs");
      }
    } else {
      setSelection(false);
    }
  }, [isSelection]);
  const handleRegister = () => {
    //Request POST for register
    axios
      .post(URL_API + "/auth/signup", {
        firstname: first,
        lastname: last,
        email: email,
        password: password,
        phone: phone,
        city: city,
        adress: adress,
        zip: codePostal,
        roles: ["user"],
      })
      .then(async (item) => {
        //Success ADD data in local storage + load token
        await deviceStorage.savekey("user", item.data);
        dispatch(isLoadingToken(true));
      })
      .catch((error) => {
        //Error poster error
        console.log("An error occurred during registration =>", error);
      });
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.contentEllipse}>
        <SvgXml
          style={Styles.svgRight}
          xml={ellipseActive ? ellipseClear : ellipseComplet}
        />
        <SvgXml
          style={Styles.svgLeft}
          xml={ellipseActive ? ellipseComplet : ellipseClear}
        />
      </View>
      <View style={Styles.card}>
        <View style={Styles.content}>
          <Text style={Styles.title}>Créer un compte</Text>
          {ellipseActive === true ? (
            <SecondPage
              adress={adress}
              setAdress={setAdress}
              phone={phone}
              setPhone={setPhone}
              city={city}
              setCity={setCity}
              codePostal={codePostal}
              setCodePostal={setCodePostal}
              isSelected={isSelected}
              setSelected={setSelected}
              setSelection={setSelection}
              navigation={navigation}
            />
          ) : (
            <FirstPage
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              first={first}
              setFirst={setFirst}
              last={last}
              setLast={setLast}
              setEllipseActive={setEllipseActive}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Register;
