import React, { useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import { login } from "../../../Store/actions/authAction";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Input } from "react-native-elements";

const Login = (props) => {
  const [email, setEmail] = useState("mathieudrapala95@gmail.com");
  const [password, setPassword] = useState("Mathieud95");

  const handleChangeEmail = (value) => {
    setEmail(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.title}>Connexion</Text>
          <View>
            <Text>Adresse Email</Text>
            <Input
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(valueEmail) => handleChangeEmail(valueEmail)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <Input
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(valuePassword) =>
                handleChangePassword(valuePassword)
              }
            />
          </View>
          <Text> Mot de passe oublié ? </Text>
          <TouchableOpacity
            style={{ marginTop: "5%" }}
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </View>
          </TouchableOpacity>
          <Text>
            J'ai déjà un compte <Text> S'inscrire</Text>
          </Text>
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
    backgroundColor: "#F4F5FA",
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
  button: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 22,
  },
});

export default Login;
