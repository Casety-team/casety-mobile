import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingReset } from "../../../actions/isResetHome";
import ButtonCirle from "../../components/Button";

import { Styles } from "./genere.module";

import backgroundLogo from "../welcome/pictures/bg_welcome.png";

const GenerePage = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [code, setCodeData] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.casety.fr/stripe/charge/genere/${route.params.reserverId}`
      )
      .then((item) => {
        item.data.map((item) => setCodeData(item.code_unlock));
      })
      .catch((err) => {
        console.log("Get Code secret fail =>", err);
      });
  }, []);

  return (
    <View style={Styles.container}>
      <View>
        <Image source={backgroundLogo} style={Styles.picture} />
        <View>
          <Text style={Styles.title}>Code :</Text>
          <Text style={[Styles.code, Styles.card]}>{code}</Text>
          <View
            style={{
              marginTop: 30,
              marginLeft: "auto",
              marginRight: "auto",
              paddingVertical: 0,
              paddingHorizontal: 1,
              borderWidth: 1,
              borderColor: "gray",
              width: 300,
            }}
          ></View>
          <View>
            <Text style={Styles.smallText}>
              Ce code est celui qui vous permettra d'ouvrir botre casier. Faites
              bien attention à ce que personne ne puisse y avoir accès.
            </Text>
            <Text style={Styles.smallTextDanger}>
              Sachez qu'un retard entrainera directement une pénalité financière
              en fonction du temps de retard.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonCirle
          onPress={() => dispatch(isLoadingReset(true))}
          navigation={() =>
            navigation.navigate("Home", {
              reset: true,
              reverserId: route.params.reserverId,
            })
          }
          name="Terminé"
          arrowSpace={40}
          width={225}
        />
      </View>
    </View>
  );
};

export default GenerePage;
