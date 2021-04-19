import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles.modules/";
import backgroundLogo from "./pictures/bg_welcome.png";
import direction from "../../assets/app/direction.svg";

export default Welcome = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <View>
        <Image source={backgroundLogo} style={styles.picture} />
        <Text style={[styles.textContent, { marginTop: "15%" }]}>
          <Text style={styles.span}>Prêt à </Text>
          vous déplacer sans encombre ?
        </Text>
        <Text style={[styles.textContent, styles.smallText]}>
          Laissez vos bagages en sécurité !
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <LinearGradient
            colors={["#6693EB", "#3375F5", "#2063FA"]}
            style={styles.button}
          >
            <View style={styles.row}>
              <Text style={styles.buttonText}>Créer un compte</Text>
              <View style={{ marginLeft: 9, marginTop: 3 }}>
                <SvgXml width="15" height="15" xml={direction} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topSpace}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            colors={["#6693EB", "#3375F5", "#2063FA"]}
            style={styles.button}
          >
            <View style={styles.row}>
              <Text style={styles.buttonText}>Se connecter</Text>
              <View style={{ marginLeft: 30, marginTop: 3 }}>
                <SvgXml width="15" height="15" xml={direction} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
