import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { InputUnderLineText } from "../../../components/Input";
import ButtonCirle from "../../../components/Button";

import { Styles } from "./register.modules";
import valid from "../pictures/valid.svg";

export default SecondPage = ({
  adress,
  setAdress,
  phone,
  setPhone,
  city,
  setCity,
  codePostal,
  setCodePostal,
  isSelected,
  setSelected,
  setSelection,
  navigation,
}) => {
  return (
    <View>
      <View>
        <Text style={Styles.subTitle}>Adresse</Text>
        <View style={Styles.row}>
          <InputUnderLineText
            placeholder="10 rue de la foret"
            value={adress}
            onChangeText={(text) => setAdress(text)}
          />
          {adress.length > 5 && (
            <SvgXml
              width="20"
              height="20"
              xml={valid}
              style={[Styles.icon_success, { fill: "black" }]}
            />
          )}
        </View>
      </View>
      <View style={Styles.spaceInput}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: "40%" }}>
            <Text style={Styles.subTitle}>Ville</Text>
            <View style={Styles.row}>
              <InputUnderLineText
                placeholder="Paris"
                value={city}
                autoCapitalize="none"
                onChangeText={(text) => setCity(text)}
              />
              {city.length > 1 && (
                <SvgXml
                  width="20"
                  height="20"
                  xml={valid}
                  style={[Styles.icon_success, { fill: "black" }]}
                />
              )}
            </View>
          </View>
          <View style={{ width: "40%", marginLeft: "20%" }}>
            <Text style={Styles.subTitle}>Code Postale</Text>
            <View style={Styles.row}>
              <InputUnderLineText
                placeholder="95440"
                value={codePostal}
                keyboardType="phone-pad"
                onChangeText={(text) => setCodePostal(text)}
              />
              {codePostal.length > 1 && (
                <SvgXml
                  width="20"
                  height="20"
                  xml={valid}
                  style={[Styles.icon_success, { fill: "black" }]}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={[Styles.spaceInput, { marginBottom: 70.9 }]}>
        <Text style={Styles.subTitle}>Numéro de téléphone</Text>
        <View style={Styles.row}>
          <View style={{ width: 285 }}>
            <InputUnderLineText
              placeholder="0628736195"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={(valuePhone) => setPhone(valuePhone)}
            />
          </View>
          {phone.length == 10 && (
            <SvgXml
              width="20"
              height="20"
              xml={valid}
              style={[Styles.icon_success]}
            />
          )}
        </View>
      </View>
      <View style={Styles.checkboxContainer}>
        <BouncyCheckbox
          fillColor="#1E68F9"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#1E68F9" }}
          onPress={() => setSelected(!isSelected)}
        />
        <Text style={Styles.smallText}>
          J'accepte les{" "}
          <Text style={{ color: "#1E68F9" }}>conditions d'utilisations</Text>
        </Text>
      </View>
      {isSelected && (
        <ButtonCirle
          navigation={() => setSelection(true)}
          name="Créer mon compte"
          arrowSpace={15}
          width={225}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={Styles.textLink}>
          J'ai déjà un compte ?<Text style={Styles.link}> Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
