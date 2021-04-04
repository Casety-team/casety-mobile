import React, { useState } from "react";
import axios from "axios";
import deviceStorage from "../../services/deviceStorage";
import { SvgXml } from "react-native-svg";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../actions/isLoadingToken";

import ellipseClear from "./pictures/Ellipse-clear.svg";
import ellipseComplet from "./pictures/Ellipse-complet.svg";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("marcus@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [first, setFirst] = useState("Marcus");
  const [last, setLast] = useState("DRAPALA");
  const [phone, setPhone] = useState("0628736195");
  const [city, setCity] = useState("ECOUEN");
  const [adress, setAdress] = useState("10 RUE DE LA FORET");
  const [codePostal, setCodePostal] = useState("95440");
  const [ellipseActive, setEllipseActive] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = () => {
    axios
      .post(
        "http://192.168.1.86:4545/api/auth/signup",
        {
          firstname: first,
          lastname: last,
          email: email,
          password: password,
          phone: phone,
          city: city,
          adress: adress,
          zip: codePostal,
          roles: ["user"],
        },
        { timeout: 2000 }
      )
      .then(async (item) => {
        console.log(item);
        dispatch(isLoadingToken(false));
        await deviceStorage.savekey("user", item.data);
      })
      .catch((item) => {
        console.log("Register fail", item);
      });
  };
  return (
    <View style={styles.background}>
      <View style={styles.contentEllipse}>
        {ellipseActive == true ? (
          <>
            <SvgXml
              style={{ marginRight: "2%" }}
              width="10"
              height="10"
              xml={ellipseClear}
            />
            <SvgXml
              style={{ marginLeft: "2%" }}
              width="10"
              height="10"
              xml={ellipseComplet}
            />
          </>
        ) : (
          <>
            <SvgXml
              style={{ marginRight: "2%" }}
              width="10"
              height="10"
              xml={ellipseComplet}
            />
            <SvgXml
              style={{ marginLeft: "2%" }}
              width="10"
              height="10"
              xml={ellipseClear}
            />
          </>
        )}
      </View>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.title}>Créer un compte</Text>
          {ellipseActive === true ? (
            <View>
              <View>
                <Text style={styles.subTitle}>Adresse</Text>
                <Input
                  style={styles.input}
                  placeholder="10 rue de la grand fontaine"
                  value={adress}
                  onChangeText={(valueAdress) => setAdress(valueAdress)}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <Text style={styles.subTitle}>Ville</Text>
                  <Input
                    style={styles.input}
                    placeholder="Ecouen"
                    value={city}
                    onChangeText={(valueCity) => setCity(valueCity)}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={styles.subTitle}>Code Postal</Text>
                  <Input
                    style={styles.input}
                    placeholder="95440"
                    value={codePostal}
                    onChangeText={(valuecodePostal) =>
                      setCodePostal(valuecodePostal)
                    }
                  />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Téléphone</Text>
                <Input
                  style={styles.input}
                  placeholder="0628736195"
                  value={phone}
                  onChangeText={(valuePhone) => setPhone(valuePhone)}
                />
              </View>
              <TouchableOpacity
                style={{
                  marginRight: "20%",
                  marginLeft: "20%",
                  marginTop: "1%",
                }}
                onPress={() => handleRegister()}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Créer mon compte </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRegister()}>
                <Text style={styles.textLink}>
                  J'ai déjà un compte ?
                  <Text style={styles.link}> Se connecter</Text>
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View>
                <Text style={styles.subTitle}>Adresse Email</Text>
                <Input
                  style={styles.input}
                  placeholder="casety@secure.com"
                  value={email}
                  onChangeText={(valueEmail) => setEmail(valueEmail)}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "50%" }}>
                  <Text style={styles.subTitle}>Prénom</Text>
                  <Input
                    style={styles.input}
                    placeholder="Mathieu"
                    value={first}
                    onChangeText={(valueFirst) => setFirst(valueFirst)}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={styles.subTitle}>Nom</Text>
                  <Input
                    style={styles.input}
                    placeholder="DRAPALA"
                    value={last}
                    onChangeText={(valueLast) => setLast(valueLast)}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.subTitle}>Mot de passe</Text>
                <Input
                  style={styles.input}
                  placeholder="*********"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(valuePassword) => setPassword(valuePassword)}
                />
              </View>
              <TouchableOpacity
                style={{ width: "20%", marginLeft: "40%", marginTop: "1%" }}
                onPress={() => setEllipseActive(true)}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{">"}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.textLink}>
                  J'ai déjà un compte ?
                  <Text style={styles.link}> Se connecter</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#486CB5",
    height: "100%",
    width: "100%",
  },
  contentEllipse: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "46%",
    marginTop: "20%",
  },
  card: {
    marginTop: "20%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container: {
    width: "80%",
    height: "100%",
    marginLeft: "10%",
  },
  title: {
    marginTop: "10%",
    marginBottom: "10%",
    fontSize: 30,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: "3%",
  },
  button: {
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
  },
  textLink: {
    color: "#B0B0B0",
    fontSize: 17,
    marginTop: "4%",
    textAlign: "center",
  },
  link: {
    color: "#0F60FB",
    borderBottomColor: "#0F60FB",
    borderBottomWidth: 1,
  },
});

export default Register;
