import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { login } from "../../../Store/actions/authAction";
import { View, Image, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import backgroundLogo from "../../../assets/logo.png";

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
    <>
      <View>
        <Image
          source={backgroundLogo}
          style={{ width: "auto", height: "50%" }}
        />
        <View
          style={{ paddingLeft: "10%", paddingRight: "10%", marginTop: "10%" }}
        >
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(valueEmail) => handleChangeEmail(valueEmail)}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(valuePassword) =>
              handleChangePassword(valuePassword)
            }
          />
          <Button
            style={(styles.button, { marginTop: "10%" })}
            title="Login"
            onPress={useDispatch(login({ email, password }))}
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

export default connect()(Login);
