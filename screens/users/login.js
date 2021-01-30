import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

import backgroundLogo from "../../assets/pictures/home/backgroundTitle.png";

const Login = ({ navigation }) => {
  return (
    <>
      <View>
        <Image
          source={backgroundLogo}
          style={{ width: "auto", height: "50%" }}
        />
        <View
          style={{ paddingLeft: "10%", paddingRight: "10%", marginTop: "10%" }}
        >
          <Input style={styles.input} placeholder="Email" />
          <Input
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button
            style={(styles.button, { marginTop: "10%" })}
            title="Login"
            type="outline"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {},
  button: {
    marginTop: "5%",
    borderRadius: 30,
  },
});

export default Login;
