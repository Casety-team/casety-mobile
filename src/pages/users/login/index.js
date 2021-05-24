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
import { onScrollEvent } from "react-native-redash/lib/module/v1";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("drapalamathieu95@gmail.com");
  const [password, setPassword] = useState("Mathieud95");
  const [show, setShow] = useState(false);
  const [sendInLocalStorage, setSendInLocalStorage] = useState(false);

  const dispatch = useDispatch();

  //Add value in redux for success request POST
  useEffect(() => {
    if (sendInLocalStorage) {
      dispatch(isLoadingToken(true));
      setSendInLocalStorage(false);
    }
  }, [sendInLocalStorage]);

  const handleLogin = () => {
    axios
      .post(
        "https://api.casety.fr/api/auth/signin",
        {
          email,
          password,
        },
        { timeout: 10000 }
      )
      .then(async (item) => {
        console.log("Login Success");
        //Add user data in localStorage
        await deviceStorage.savekey(item.data);
        setSendInLocalStorage(true);
      })
      .catch((err) => {
        //print console log if error call API
        console.log("Login Fail =>", err);
      });
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
            </View>
          </View>
          <Text style={Styles.smallText}> Mot de passe oublié ? </Text>
          <ButtonCirle
            navigation={() => handleLogin()}
            name="Connexion"
            arrowSpace={60}
            width={250}
          />
          <View>
            <Text style={Styles.textLink}>
              Je n'ai pas de compte !
              <View style={{ marginBottom: -4 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={Styles.link}> S'inscrire</Text>
                </TouchableOpacity>
              </View>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
