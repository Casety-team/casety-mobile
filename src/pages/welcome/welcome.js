import React, { useState } from "react";
import { View, Image, Button, Text } from "react-native";

import backgroundLogo from "../../../assets/logo.png";

const Welcome = ({ navigation }) => {
  return (
    <View>
      <View>
        <Image
          source={backgroundLogo}
          style={{ width: "auto", height: "50%" }}
        />
        <Text>
          <Text>
            <Text>Prêt à</Text> vous déplacer sans encombre ?
          </Text>
          Laissez vos bagages en sécurité !
        </Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

export default Welcome;
