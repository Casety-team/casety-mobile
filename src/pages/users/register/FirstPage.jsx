import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SvgXml } from "react-native-svg";

import { InputUnderLineText } from "../../../components/Input";
import ButtonCirle from "../../../components/Button";

import { Styles } from "./register.modules";

import eye_open from "../pictures/eye_open.svg";
import eye_close from "../pictures/eye_close.svg";
import valid from "../pictures/valid.svg";

export default FirstPage = ({
  email,
  setEmail,
  password,
  setPassword,
  first,
  setFirst,
  last,
  setLast,
  show,
  setShow,
  setEllipseActive,
  navigation,
}) => {
  const [successEmail, setSuccessEmail] = useState(false);
  const [successPassword, setSuccessPassword] = useState(false);

  //Email
  useEffect(() => {
    const verifEmail = validateEmail();
    if (verifEmail) {
      setSuccessEmail(true);
    } else {
      setSuccessEmail(false);
    }
  }, [email]);

  //Password
  useEffect(() => {
    validatePassword();
  }, [password]);

  //Verif Email
  const validateEmail = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  };
  //Verif Password
  const validatePassword = () => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (strongRegex.test(password)) {
      console.log("secure");
      setSuccessPassword(true);
    } else if (mediumRegex.test(password)) {
      console.log("medium");
      setSuccessPassword(true);
    } else {
      console.log("refus");
      setSuccessPassword(false);
    }
  };

  return (
    <View>
      <View>
        <Text style={Styles.subTitle}>Adresse Email</Text>
        <View style={Styles.row}>
          <InputUnderLineText
            placeholder="casety@secure.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {successEmail && (
            <SvgXml
              width="20"
              height="20"
              xml={valid}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[Styles.icon_success, { fill: "black" }]}
            />
          )}
        </View>
      </View>
      <View style={Styles.spaceInput}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: "40%" }}>
            <Text style={Styles.subTitle}>Prénom</Text>
            <View style={Styles.row}>
              <InputUnderLineText
                placeholder="Casety"
                value={first}
                onChangeText={(text) => setFirst(text)}
              />
              {first.length > 1 && (
                <SvgXml
                  width="20"
                  height="20"
                  xml={valid}
                  style={[Styles.icon_success, { fill: "black" }]}
                />
              )}
            </View>
          </View>
          <View style={{ width: "40%", marginLeft: "20%" }}>
            <Text style={Styles.subTitle}>Nom</Text>
            <View style={Styles.row}>
              <InputUnderLineText
                placeholder="Secure"
                value={last}
                onChangeText={(text) => setLast(text)}
              />
              {last.length > 1 && (
                <SvgXml
                  width="20"
                  height="20"
                  xml={valid}
                  style={[Styles.icon_success, { fill: "black" }]}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={[Styles.spaceInput, { marginBottom: 70.9 }]}>
        <Text style={Styles.subTitle}>Mot de passe</Text>
        <View style={Styles.row}>
          <View style={{ width: 285 }}>
            <InputUnderLineText
              placeholder="************"
              value={password}
              autoCapitalize="none"
              secureTextEntry={!show}
              onChangeText={(valuePassword) => setPassword(valuePassword)}
            />
          </View>
          <SvgXml
            onPress={() => setShow(!show)}
            width="20"
            height="20"
            xml={!show ? eye_close : eye_open}
            style={[Styles.icon_eye, { fill: "black" }]}
          />
          {successPassword && (
            <SvgXml
              onPress={() => setShow(!show)}
              width="20"
              height="20"
              xml={valid}
              style={[Styles.icon_success]}
            />
          )}
        </View>
      </View>
      <ButtonCirle
        navigation={() => setEllipseActive(true)}
        name=""
        arrowSpace={0}
        width={60}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={Styles.textLink}>
          J'ai déjà un compte ?<Text style={Styles.link}> Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
