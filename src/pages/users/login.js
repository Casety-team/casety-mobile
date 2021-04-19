import { URL_API } from "@env";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import deviceStorage from "../../services/deviceStorage";
import { Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../actions/isLoadingToken";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("mathieudrapala95@gmail.com");
  const [password, setPassword] = useState("Mathieud95");
  const [sendInLocalStorage, setSendInLocalStorage] = useState(false);

  const handleLogin = () => {
    console.log(URL_API + "/auth/signin");
    axios
      .post(
        URL_API + "/auth/signin",
        {
          email,
          password,
        },
        { timeout: 9000 }
      )
      .then(async (item) => {
        await deviceStorage.savekey(item.data);
        setSendInLocalStorage(true);
      })
      .catch((err) => {
        console.log("Login fail", err);
      });
  };

  if (sendInLocalStorage) {
    dispatch(isLoadingToken(true));
    setSendInLocalStorage(false);
  }

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.title}>Connexion</Text>
          <View>
            <Text style={styles.subTitle}>Adresse Email</Text>
            <Input
              style={styles.input}
              placeholder="casety@secure.com"
              value={email}
              onChangeText={(valueEmail) => setEmail(valueEmail)}
            />
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
          {/* <View>
            <TouchableOpacity>
              <Text style={styles.textLink}>
                <Text>J'accepte les </Text>
                <Text style={styles.link}>conditions d'utilisation</Text>
              </Text>
            </TouchableOpacity>
          </View> */}
          <Text style={styles.smallText}> Mot de passe oublié ? </Text>
          <TouchableOpacity
            style={{ marginTop: "5%" }}
            onPress={() => handleLogin()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Connexion</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.textLink}>
              J'ai déjà un compte ?<Text style={styles.link}> S'inscrire</Text>
            </Text>
          </TouchableOpacity>
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
  card: {
    marginTop: "30%",
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
    fontSize: 33,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: "3%",
  },
  smallText: {
    fontSize: 10,
    color: "#B0B0B0",
    fontFamily: "Helvetica-Light",
    marginLeft: "3%",
    marginBottom: "5%",
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
  },
  textLink: {
    marginTop: "30%",
    color: "#B0B0B0",
    fontSize: 20,
    textAlign: "center",
  },
  link: {
    fontSize: 20,
    color: "#0F60FB",
    borderBottomColor: "#0F60FB",
    borderBottomWidth: 1,
  },
});

export default Login;
