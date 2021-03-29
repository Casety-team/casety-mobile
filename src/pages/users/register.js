import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import backgroundLogo from "../../../assets/logo.png";

const Register = ({ navigation }) => {
  return (
    <ScrollView>
      <Image
        source={backgroundLogo}
        style={{ width: "auto", height: "100%" }}
      />
      <View
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          marginTop: "10%",
        }}
      >
        <Input style={styles.input} placeholder="Firstname" />
        <Input style={styles.input} placeholder="Lastname" />
        <Input style={styles.input} placeholder="Email" />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          style={styles.button}
          title="Register"
          type="outline"
          onPress={() => {
            navigation.navigate("user");
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: "5%",
    borderRadius: 30,
  },
});

export default Register;
