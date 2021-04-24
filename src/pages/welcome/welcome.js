import React from "react";
import { View, Text, Image } from "react-native";
import ButtonCirle from "../../components/Button";
import { Styles } from "./welcome.modules";
import backgroundLogo from "./pictures/bg_welcome.png";

export default Welcome = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <View>
        <Image source={backgroundLogo} style={Styles.picture} />
        <Text style={Styles.title}>
          <Text style={Styles.span}>Prêt à </Text>
          vous déplacer sans encombre ?
        </Text>
        <Text style={Styles.smallText}>Laissez vos bagages en sécurité !</Text>
        <View>
          <ButtonCirle
            navigation={() => navigation.navigate("Register")}
            name="Créer un compte"
            arrowSpace={15}
            width={225}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <ButtonCirle
            navigation={() => navigation.navigate("Login")}
            name="Se connecter"
            arrowSpace={40}
            width={225}
          />
        </View>
      </View>
    </View>
  );
};
