import { URL_API } from "@env";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../../actions/isLoadingToken";
import axios from "axios";
import deviceStorage from "../../../services/deviceStorage";
import { SvgXml } from "react-native-svg";

//Components
import { TouchableOpacity, View, Text } from "react-native";
import { InputUnderLineText } from "../../../components/Input";
import ButtonCirle from "../../../components/Button";

import { Styles } from "./login.modules";

import eye_open from "../pictures/eye_open.svg";
import eye_close from "../pictures/eye_close.svg";
import valid from "../pictures/valid.svg";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successEmail, setSuccessEmail] = useState(false);
  const [successPassword, setSuccessPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [sendInLocalStorage, setSendInLocalStorage] = useState(false);

  const dispatch = useDispatch();

  //Verify Input Email
  useEffect(() => {
    const verifEmail = validateEmail();
    if (verifEmail) {
      setSuccessEmail(true);
    } else {
      setSuccessEmail(false);
    }
  }, [email]);

  //Verify Input Password
  useEffect(() => {
    validatePassword();
  }, [password]);

  const handleLogin = () => {
    axios
      .post(
        URL_API + "/auth/signin",
        {
          email,
          password,
        },
        { timeout: 10000 }
      )
      .then(async (item) => {
        //Add user data in localStorage
        console.log("Login Success");
        await deviceStorage.savekey(item.data);
        setSendInLocalStorage(true);
      })
      .catch((err) => {
        //print console log if error call API
        console.log("Login Fail", err);
      });
  };

  //Add value in redux for success request POST
  if (sendInLocalStorage) {
    dispatch(isLoadingToken(true));
    setSendInLocalStorage(false);
  }

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
    <View style={Styles.container}>
      <View style={Styles.card}>
        <View style={Styles.content}>
          <Text style={Styles.title}>Connexion</Text>
          <View>
            <Text style={Styles.subTitle}>Adresse Email</Text>
            <View style={Styles.row}>
              <InputUnderLineText
                placeholder="casety@secure.com"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
              {successEmail && (
                <SvgXml
                  width="20"
                  height="20"
                  xml={valid}
                  style={[Styles.icon_success, { fill: "black" }]}
                />
              )}
            </View>
          </View>
          <View style={Styles.spaceInput}>
            <Text style={Styles.subTitle}>Mot de passe</Text>
            <View style={Styles.row}>
              <View style={{ width: 285 }}>
                <InputUnderLineText
                  placeholder="************"
                  value={password}
                  secureTextEntry={!show}
                  autoCapitalize="none"
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
          <Text style={Styles.smallText}> Mot de passe oublié ? </Text>
          <ButtonCirle
            navigation={() => handleLogin()}
            name="Connexion"
            arrowSpace={60}
            width={250}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={Styles.textLink}>
              Je n'ai pas de compte !
              <Text style={Styles.link}> S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
